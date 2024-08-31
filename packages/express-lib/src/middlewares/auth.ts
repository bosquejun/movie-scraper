import {
	HttpForbiddenError,
	HttpRequestError,
	HttpUnauthorizedError,
} from "@comeback/errors";
import { UserRoles } from "@comeback/types";
import { verifyJwt } from "@comeback/utils";
import { Express, NextFunction, Request, Response } from "express";
import { HttpRequest } from "..";
import { getErrorData } from "../get-error-data";

export type GetAuthInfoFn = () => Promise<{
	publicKey: string;
}>;

export type HttpRequestAuthInfo = HttpRequest & {
	getAuthInfo: GetAuthInfoFn;
};

function extractJwtFromReq(req: HttpRequestAuthInfo) {
	const { authorization } = req.headers;

	if (!authorization) return;

	const [bearer, token] = authorization?.split(" ");

	if (bearer !== "Bearer" || !token?.length) return;

	return token;
}

function wrap(fn: (req: Request) => Promise<void | boolean>) {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const response = await fn(req);
			if (!response) {
				throw new HttpUnauthorizedError();
			}
			next();
		} catch (error) {
			const errorData = getErrorData(error as Error | HttpRequestError);
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
	};
}

export async function decodeJwtFromRequest(req: Request) {
	const jwt = extractJwtFromReq(req as HttpRequestAuthInfo);
	const { publicKey } = await (req as HttpRequestAuthInfo).getAuthInfo();

	if (!jwt) {
		throw new HttpUnauthorizedError();
	}
	try {
		return verifyJwt(jwt, publicKey);
	} catch (error) {
		const { message, name } = error as {
			message: string;
			name: string;
		};
		console.error({ message });
		if (name === "TokenExpiredError") {
			throw new HttpUnauthorizedError("unauthorized", "Expired jwt.");
		}
		throw new HttpUnauthorizedError();
	}
}

export function hasRole(roles: UserRoles | UserRoles[]) {
	const _roles = typeof roles === "string" ? [roles] : roles;
	return wrap(async (req: Request) => {
		const jwtPayload = await decodeJwtFromRequest(req);

		if (
			!_roles.some((r) => jwtPayload.roles.some((_r: string) => _r === r))
		) {
			throw new HttpForbiddenError(
				"access_denied",
				"Access denied: insufficient role permissions."
			);
		}

		return true;
	});
}

export function hasJwt() {
	return wrap(async (req: Request) => {
		await decodeJwtFromRequest(req);

		return true;
	});
}

export function useAuthMiddleware(app: Express, getAuthInfo: GetAuthInfoFn) {
	app.use((req, res, next) => {
		(req as HttpRequestAuthInfo)["getAuthInfo"] = getAuthInfo;
		next();
	});
}
