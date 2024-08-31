import { getEnv } from "@comeback/utils";
import { Express, Request } from "express";
import { randomUUID } from "node:crypto";
import logger, { Options } from "pino-http";

export function useExpressLogger(
	app: Express,
	options: Options = {
		level: getEnv("LOG_LEVEL", "info"),
	}
) {
	app.use(
		logger({
			genReqId: function (req, res) {
				const existingID = req.id ?? req.headers["x-request-id"];
				if (existingID) return existingID;
				const id = randomUUID();
				res.setHeader("X-Request-Id", id);
				return id;
			},
			quietResLogger: true,
			quietReqLogger: true,
			customReceivedMessage: function (req, res) {
				return `Request received: ${req.method} ${req.url}`;
			},

			// Define a custom error message
			customErrorMessage: function (req, res, err) {
				return "request errored with status code: " + res.statusCode;
			},
			customReceivedObject(req, res, val) {
				return {
					remoteAddress: (req as Request).ip,
					...(options?.level === "debug" && {
						headers: req.headers,
					}),
				};
			},
			customSuccessObject(req, res, val) {
				return {
					remoteAddress: (req as Request).ip,
					responseTime: val.responseTime,
					...(options?.level === "debug" && {
						headers: req.headers,
					}),
				};
			},
			customSuccessMessage(req, res, responseTime) {
				return `Request completed: ${req.method} ${req.url} - ${responseTime}ms`;
			},
			...((getEnv("NODE_ENV") === "" ||
				getEnv("NODE_ENV") === "local") && {
				transport: {
					target: "pino-http-print",
					level: "info",
					options: {
						destination: 1, // optional (default stdout)
						all: true,
						colorize: true,
						translateTime: true,
						relativeUrl: false,
					},
				},
			}),
			redact: {
				paths: ["req.body.password", "*.headers.authorization"],
				remove: true,
			},
			...options,
		})
	);
}
