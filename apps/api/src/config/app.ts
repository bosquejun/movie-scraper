import { LogLevel, NodeEnvironment } from "@comeback/types";
import { getEnv } from "@comeback/utils";

type AppConfig = {
	env: NodeEnvironment;
	logLevel: LogLevel;
	movieWebsites: {
		imdbRatingUrl: string;
		rottenTomatoesUrl: string;
		metaCriticUrl: string;
	};
	db: {
		user: string;
		password: string;
		database: string;
		port: number;
		host: string;
	};
	auth: {
		secret: string;
		publicKey: string;
	};
	clients: {
		urls: string;
	};
	redis: {
		host: string;
		port: number;
	};
};

const appConfig: AppConfig = {
	env: getEnv<NodeEnvironment>("NODE_ENV", "production"),
	logLevel: getEnv<LogLevel>("LOG_LEVEL", "info"),
	movieWebsites: {
		imdbRatingUrl: getEnv("IMDB_RATING_URL"),
		rottenTomatoesUrl: getEnv("ROTTEN_TOMATOES_URL"),
		metaCriticUrl: getEnv("META_CRITIC_URL"),
	},
	db: {
		database: getEnv("DB_NAME", "api"),
		user: getEnv("DB_USER"),
		password: getEnv("DB_PASSWORD"),
		port: Number(getEnv("DB_PORT", "5432")),
		host: getEnv("DB_HOST", "localhost"),
	},
	auth: {
		secret: getEnv("JWT_SECRET"),
		publicKey: getEnv("JWT_PUBLIC_KEY"),
	},
	clients: {
		urls: getEnv("FRONTEND_URL"),
	},
	redis: {
		host: getEnv("REDIS_HOST"),
		port: +getEnv("REDIS_PORT"),
	},
};

export default appConfig;
