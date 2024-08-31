import { Request } from "express";
import type { HttpLogger } from "pino-http";
import { CacheRequestMiddleware, GetAuthInfoFn } from "./middlewares";

export { RequestPayload } from "./get-payload";
export * from "./middlewares";
export * from "./routeBuilder";

export type HttpRequest = Request & HttpLogger;

export type HttpRequestContext = HttpRequest & {
	getAuthInfo: GetAuthInfoFn;
	cacheMiddleware: CacheRequestMiddleware;
};
