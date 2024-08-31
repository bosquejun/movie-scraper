import { HttpRequestError } from "@comeback/errors";
import { TAnyHash, TStringHash } from "@comeback/types";
import { Response } from "express";
import { HttpRequest } from "..";
import { getErrorData } from "../get-error-data";
import { getReqPayload, RequestPayload } from "../get-payload";

export type RouteHandler<
	TBody extends TAnyHash | unknown,
	TParams extends TStringHash | unknown,
	TQuery extends TStringHash | unknown,
	TPaginated extends boolean,
	TResponse = TAnyHash,
> = (
	payload: RequestPayload<TBody, TParams, TQuery, TPaginated>,
	req: HttpRequest
) => Promise<TResponse | never>;

export type RequestMiddlewareOptions = {
	successStatus?: number;
};

export function handleRequestError(
	error: Error | HttpRequestError,
	res: Response
) {
	// @todo - proper logging
	console.error((error as any).message);
	const errorData = getErrorData(error);
	res.status(errorData.statusCode).json({
		status: errorData.status,
		data: null,
		errors: [
			{
				code: errorData.code,
				message: errorData.message,
			},
		],
		date: new Date(),
	});
}

export function requestMiddleware<
	TBody extends TAnyHash,
	TParams extends TAnyHash,
	TQuery extends TAnyHash,
	TResponse = Partial<TAnyHash> | never | void,
>(
	handler: RouteHandler<TBody, TParams, TQuery, false, TResponse>,
	options?: RequestMiddlewareOptions
): any {
	return async (req: HttpRequest, res: Response) => {
		try {
			const payload = getReqPayload<TBody, TParams, TQuery, false>(
				req,
				false
			);

			const response = await handler(payload, req);

			res.status(options?.successStatus || 200).json({
				status: "OK",
				data: response || {
					message: "success",
				},
				errors: null,
				date: new Date(),
			});
		} catch (error) {
			handleRequestError(error as Error | HttpRequestError, res);
		}
	};
}
