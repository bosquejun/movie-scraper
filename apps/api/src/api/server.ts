import { HttpNotFoundError } from "@comeback/errors";
import {
	expressRouteBuilder,
	requestMiddleware,
	useAuthMiddleware,
	useCacheMiddleware,
} from "@comeback/express-lib";
import { useExpressLogger } from "@comeback/logger";
import { getRedisClient } from "@comeback/redis";
import cors from "cors";
import express, { Express } from "express";
import appConfig from "src/config/app";
import { getHealthcheck } from "../app/health-check";
import versionedRouteObjects from "./routes";

const port = process.env.PORT || 3001;

export default async function startExpressServer(app: Express) {
	app.use(express.json());
	app.use(
		cors({
			origin: appConfig.clients.urls.split(","),
		})
	);
	useExpressLogger(app);
	useAuthMiddleware(app, async () => {
		return {
			publicKey: appConfig.auth.publicKey,
		};
	});

	useCacheMiddleware(app, getRedisClient());

	app.get("/health", requestMiddleware(getHealthcheck));

	expressRouteBuilder(app, versionedRouteObjects);

	app.all(
		"*",
		requestMiddleware(async () => {
			throw new HttpNotFoundError();
		})
	);

	app.listen(port, () => {
		console.log(`[server]: Server is running at http://localhost:${port}`);
	});
}
