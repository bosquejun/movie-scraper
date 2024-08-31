import { TAnyHash } from "@comeback/types";
import Redis from "ioredis";
import { getRedisClient } from "./client";

export type CacheBuilderConfig<TKey = string> = {
	key: TKey;
	ttl?: number;
	tags?: string[];
	dataType: "string" | "JSON";
};

function sanitizeKey(key: string) {
	return key.split(" ").join("_");
}

export type CacheClientConfig = {
	keyPrefix: string;
	defaultTTL: number;
};

export class CacheClient {
	constructor(
		private readonly redisClient: Redis = getRedisClient(),
		private readonly config: CacheClientConfig = {
			keyPrefix: "cache",
			defaultTTL: 10_000,
		}
	) {}

	build(config: CacheBuilderConfig) {
		const getKey = () => {
			const _key = this.getKey(config.key, config?.tags || []);

			return _key;
		};

		const getInstance = () => this;

		return {
			async get<
				TData extends TAnyHash | string,
			>(): Promise<TData | null> {
				const cachedData =
					await getInstance().redisClient.get(getKey());
				return cachedData
					? config?.dataType === "JSON"
						? JSON.parse(cachedData)
						: cachedData
					: cachedData;
			},
			async set<TData extends TAnyHash | string>(value: TData) {
				await getInstance().redisClient.set(
					getKey(),
					config?.dataType === "JSON" || typeof value !== "string"
						? JSON.stringify(value)
						: value,
					"PX",
					config?.ttl || getInstance().config.defaultTTL || 10_000
				);
			},
		};
	}

	private getKey(key: string, tags?: string[]) {
		const individualKey = sanitizeKey(key);

		const stringTags = tags?.join(":");

		return [
			this.config.keyPrefix,
			[stringTags, individualKey].join("|"),
		].join(":");
	}

	async get(key: string) {
		const cacheKey = this.getKey(key);
		const cachedData = await this.redisClient.get(cacheKey);

		if (!cachedData) return;

		return JSON.parse(cachedData);
	}

	async set(
		key: string,
		data: string | TAnyHash,
		config?: { expiration?: number }
	) {
		const cacheKey = this.getKey(key);
		await this.redisClient.set(
			cacheKey,
			typeof data === "string" ? data : JSON.stringify(data),
			"PX",
			config?.expiration || this.config.defaultTTL || 10_000
		);
	}

	async invalidate(key: string) {
		const cacheKey = this.getKey(key);
		await this.redisClient.del(cacheKey);
	}

	async invalidateByTags(tags: string | string[]) {
		const _tags = typeof tags === "string" ? [tags] : tags;
		const allKeys = await this.redisClient.keys(
			`${this.config.keyPrefix}:*`
		); // Retrieve all keys with the keyPrefix

		const matchingKeys = allKeys.filter((key) => {
			const [keyTags] = key
				.slice(this.config.keyPrefix.length)
				.split("|"); // Extract the tags part of the key
			return _tags.some((tag: string) => keyTags.includes(tag)); // Check if any tag is present
		});

		if (matchingKeys.length > 0) {
			await this.redisClient.del(matchingKeys);
		}
	}
}
