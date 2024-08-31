import { ApiVersion, HTTP_METHODS, HttpMethod } from "@comeback/types";
import { Express, RequestHandler } from "express";

// export type RouteHandler

export type RoutesObject = Record<
	`${HttpMethod} /${string}`,
	Array<RequestHandler>
>;

export type VersionedRouteObjects = Record<ApiVersion, RoutesObject>;

export function expressRouteBuilder(
	app: Express,
	versionedRoutes: VersionedRouteObjects
) {
	let version: ApiVersion;

	// iterate through versioned api routes
	for (version in versionedRoutes) {
		const versionedRoute = versionedRoutes[version];

		for (const routePathString in versionedRoute) {
			const [method, routePath] = routePathString.split(" ");

			if (!HTTP_METHODS.includes(method as HttpMethod)) {
				throw new Error(
					`Invalid api route definition:  ${routePathString}`
				);
			}

			const expressMethod = method?.toLowerCase() as string;
			const handlers =
				versionedRoute[routePathString as keyof typeof versionedRoute];

			const versionedPath = `/api/${version}${routePath}`;

			console.log(`Registering api route: ${method} ${versionedPath}`);

			app[expressMethod as keyof typeof app](versionedPath, handlers);
		}
	}
}
