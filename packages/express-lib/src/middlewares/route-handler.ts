import { HttpInvalidDataError, HttpRequestError } from "@comeback/errors";
import {
	checkDataSchemaErrors,
	createResponseSchemaObject,
	PaginatedResponse,
} from "@comeback/schema";
import { TAnyHash } from "@comeback/types";
import { Static, TArray, TSchema } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import { Request, Response } from "express";
import {
	CacheRouteBuilder,
	HttpRequest,
	HttpRequestContext,
	RequestPayload,
} from "..";
import { getReqPayload } from "../get-payload";
import { handleRequestError, RouteHandler } from "./request";

type RouteRequestSchema = {
	body: TSchema;
	params: TSchema;
	query: TSchema;
};

type RouteSchema = {
	request: Partial<RouteRequestSchema>;
	response: TSchema;
};

// Helper type to handle extracting Static type or default to unknown
type InferSchemaType<T, K extends keyof T> = T extends undefined
	? unknown
	: K extends keyof T
		? T[K] extends TSchema
			? Static<T[K]>
			: unknown
		: unknown;

type InferPaginatedResponse<
	TPaginated extends boolean | undefined,
	TResponse extends TSchema,
> = TPaginated extends true
	? {
			totalCount: number;
			result: Static<TResponse>;
		}
	: Static<TResponse>;

type RouteOptions = {
	paginated: boolean;
	successStatus?: number;
	castRequestParams?: boolean;
	cache?: CacheRouteBuilder;
};

type RouteHandlerParams<
	TRouteSchema extends RouteSchema,
	TRouteOptions extends RouteOptions,
> = {
	schema: TRouteSchema;
	handler: RouteHandler<
		InferSchemaType<TRouteSchema["request"], "body">,
		InferSchemaType<TRouteSchema["request"], "params">,
		InferSchemaType<TRouteSchema["request"], "query">,
		TRouteOptions["paginated"],
		InferPaginatedResponse<
			TRouteOptions["paginated"],
			TRouteSchema["response"]
		>
	>;
	options?: TRouteOptions;
};

function getPaginationResponse<TRouteSchema extends RouteSchema>(
	payload: RequestPayload<
		InferSchemaType<TRouteSchema["request"], "body">,
		InferSchemaType<TRouteSchema["request"], "params">,
		InferSchemaType<TRouteSchema["request"], "query">,
		true
	>,
	response: InferPaginatedResponse<true, TRouteSchema["response"]>
) {
	const { pagination } = payload;
	const { totalCount, result } = response;
	const count = (result as TArray).length;
	const totalPages = Math.ceil(totalCount / pagination.pageSize);
	const currentPage = pagination.page;
	const nextPage = currentPage < totalPages ? currentPage + 1 : null;
	const prevPage = currentPage > 1 ? currentPage - 1 : null;

	return {
		currentPage,
		nextPage,
		prevPage,
		pageSize: pagination.pageSize,
		count,
		totalCount,
	};
}

function buildResponse<
	TRouteSchema extends RouteSchema,
	TPaginated extends boolean,
>(
	payload: RequestPayload<
		InferSchemaType<TRouteSchema["request"], "body">,
		InferSchemaType<TRouteSchema["request"], "params">,
		InferSchemaType<TRouteSchema["request"], "query">,
		true
	>,
	response: InferPaginatedResponse<TPaginated, TRouteSchema["response"]>,
	isPaginated: TPaginated
) {
	const responseData: {
		status: string;
		data: Static<TRouteSchema["response"]>;
		errors: null;
		pagination?: PaginatedResponse;
		date: string;
	} = {
		status: "OK",
		data: null,
		errors: null,
		date: new Date().toISOString(),
	};

	if (isPaginated) {
		const paginatedResponse = response as InferPaginatedResponse<
			true,
			TRouteSchema["response"]
		>;
		responseData["data"] = paginatedResponse.result;
		responseData["pagination"] = getPaginationResponse(
			payload,
			paginatedResponse
		);
	} else {
		responseData["data"] = response as InferPaginatedResponse<
			false,
			TRouteSchema["response"]
		>;
	}

	return responseData;
}

function getValidatedPayload<
	TRouteSchema extends RouteSchema,
	TRouteOptions extends RouteOptions,
>(req: HttpRequest, schema: TRouteSchema["request"], options: TRouteOptions) {
	const payload = getReqPayload<
		InferSchemaType<TRouteSchema["request"], "body">,
		InferSchemaType<TRouteSchema["request"], "params">,
		InferSchemaType<TRouteSchema["request"], "query">,
		(typeof options)["paginated"]
	>(req, options.paginated);

	function checkReqSchema(
		location: keyof RouteSchema["request"],
		schema: TSchema,
		data?: TAnyHash
	) {
		const errors = checkDataSchemaErrors(schema, data!);

		if (errors?.length) {
			console.error(errors);
			throw new HttpInvalidDataError(
				"request_schema_error",
				`Received invalid ${location} request data schema`
			);
		}
	}

	if (schema.body) {
		checkReqSchema("body", schema.body, payload.body!);
	}

	if (schema.params) {
		if (options.castRequestParams) {
			(payload as any)["params"] = Value.Cast(
				schema.params,
				payload.params
			);
		}
		checkReqSchema("params", schema.params, payload.params!);
	}

	if (schema.query) {
		checkReqSchema("query", schema.query, payload.query!);
	}

	return payload;
}

export function routeHandlerMiddleware<
	TRouteSchema extends RouteSchema,
	TRouteOptions extends RouteOptions,
>({
	handler,
	options,
	schema,
}: RouteHandlerParams<TRouteSchema, TRouteOptions>) {
	return async (req: Request, res: Response) => {
		options = Object.assign(
			{ paginated: false, castRequestParams: true } as TRouteOptions,
			options
		) as TRouteOptions;
		try {
			const validatePayload = getValidatedPayload<
				TRouteSchema,
				TRouteOptions
			>(req as HttpRequest, schema.request, options);

			const cache = (
				req as HttpRequestContext
			).cacheMiddleware.buildRoute(options.cache);

			let routeResponse: any;
			if (cache) {
				routeResponse = await cache.get();
			}

			if (!routeResponse) {
				routeResponse = await handler(
					validatePayload,
					req as HttpRequest
				);

				if (cache) {
					await cache.set(routeResponse);
				}
			}

			const fullResponseData = buildResponse<
				TRouteSchema,
				(typeof options)["paginated"]
			>(validatePayload, routeResponse, options.paginated);

			const schemaErrors = checkDataSchemaErrors(
				createResponseSchemaObject(schema.response, options.paginated),
				fullResponseData
			);

			if (schemaErrors?.length) {
				console.error(schemaErrors);
				throw new Error("Response schema is invalid");
			}

			res.status(options.successStatus || 200).json(fullResponseData);
		} catch (error) {
			handleRequestError(error as Error | HttpRequestError, res);
		}
	};
}
