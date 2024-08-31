import { loadDatabase } from "@comeback/model";
import { setupRedisClient } from "@comeback/redis";
import "dotenv/config";
import express from "express";
import path from "path";
import startExpressServer from "./api/server";
import appConfig from "./config/app";

(async () => {
	const app = express();

	await loadDatabase({
		entitiesPath: path.join(__dirname, "./model/entities"),
	});

	setupRedisClient(appConfig.redis);

	startExpressServer(app).catch(console.error);
})();
