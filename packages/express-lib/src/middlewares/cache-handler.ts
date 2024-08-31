import {
	CacheBuilderConfig,
	CacheClient,
	CacheClientConfig,
} from "@comeback/redis";
import { Express } from "express";
import Redis from "ioredis";
import { HttpRequestContext } from "..";

type CacheKeyBuilder = (req: HttpRequestContext) => string;

type CacheKey = string | CacheKeyBuilder | boolean;

export type CacheRouteBuilder = Omit<
	CacheBuilderConfig<CacheKey>,
	"key" | "dataType"
> & {
	key?: CacheKey;
};

export class CacheRequestMiddleware extends CacheClient {
	constructor(
		redisClient: Redis,
		private readonly req: HttpRequestContext,
		config?: CacheClientConfig
	) {
		super(redisClient, config);
	}

	private getCacheKeyFromReq() {
		const { query, path } = this.req;
		const sanitized_path = path.slice(1).replace(/\//g, "_");
		const sanitized_query = Object.keys(query)
			.reduce((acc, k) => {
				acc.push(`${k}_${query[k]}`);
				return acc;
			}, [] as string[])
			.join("_");

		return [sanitized_path, sanitized_query].join("_");
	}

	buildRoute(routeOption?: CacheRouteBuilder) {
		if (!routeOption) return;
		let key = "";
		if (
			typeof routeOption.key === "boolean" ||
			typeof routeOption.key === "undefined"
		) {
			if (routeOption.key === false) {
				return;
			} else {
				key = this.getCacheKeyFromReq();
			}
		} else if (typeof routeOption.key === "string") {
			key = routeOption.key;
		} else if (typeof routeOption.key !== "undefined") {
			key = routeOption.key(this.req);
		}
		return super.build({
			...routeOption,
			key,
			dataType: "JSON",
		});
	}
}

export function useCacheMiddleware(
	app: Express,
	redisClient: Redis,
	config?: CacheClientConfig
) {
	app.use((req, res, next) => {
		(req as HttpRequestContext)["cacheMiddleware"] =
			new CacheRequestMiddleware(
				redisClient,
				req as HttpRequestContext,
				config
			);
		next();
	});
}
