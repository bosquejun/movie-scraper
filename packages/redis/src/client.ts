import Redis, { RedisOptions } from "ioredis";

let redis: Redis | null = null;

export function setupRedisClient(options: RedisOptions) {
	if (!redis) {
		redis = new Redis(options);

		redis.on("connect", () => {
			console.log("Redis client connected.");
		});

		redis.on("connecting", () => {
			console.log("Establishing Redis client connection at:", options);
		});
	}
}

export function getRedisClient(): Redis {
	return redis as Redis;
}

export default redis;
