import { PaginationSchema } from "@comeback/schema";
import { TAnyHash, TStringHash } from "@comeback/types";
import { getEnv } from "@comeback/utils";
import { HttpRequest } from ".";

export type RequestPayload<
	TBody extends TAnyHash | unknown,
	TParams extends TStringHash | unknown,
	TQuery extends TStringHash | unknown,
	TPaginated extends boolean,
> = {
	body: TBody;
	params: TParams;
	query: TQuery;
	pagination: TPaginated extends true ? PaginationSchema : null;
};

function extractPaginationParams(req: HttpRequest): PaginationSchema {
	const query = { ...req.query };

	return {
		page: +(query?.page || 1),
		pageSize: +(
			query?.pageSize || getEnv("PAGINATION_DEFAULT_SIZE", "100")
		),
	};
}

export function getReqPayload<
	TBody extends TAnyHash | unknown,
	TParams extends TStringHash | unknown,
	TQuery extends TStringHash | unknown,
	TPaginated extends boolean,
>(
	req: HttpRequest,
	isPaginated: TPaginated
): RequestPayload<TBody, TParams, TQuery, TPaginated> {
	const { body, params, query } = req;

	const pagination = (
		isPaginated ? extractPaginationParams(req) : null
	) as TPaginated extends true ? PaginationSchema : null;

	return {
		body: body as TBody,
		params: params as TParams,
		query: query as TQuery,
		pagination,
	};
}
