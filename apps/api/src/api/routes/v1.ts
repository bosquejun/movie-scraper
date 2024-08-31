import {
	ApiError,
	HttpForbiddenError,
	HttpInvalidDataError,
	HttpUnauthorizedError,
} from "@comeback/errors";
import {
	decodeJwtFromRequest,
	hasJwt,
	hasRole,
	routeHandlerMiddleware,
	RoutesObject,
} from "@comeback/express-lib";
import {
	AdminCreateUserSchema,
	AuthJwtPayload,
	ListMoviesSchema,
	QueryMoviesSchema,
	ScrapeMovieSchema,
	UserLoginResponseSchema,
	UserLoginSchema,
	UserRegisterResponseSchema,
	UserRegisterSchema,
} from "@comeback/schema";
import { UserRoles } from "@comeback/types";
import { Type } from "@sinclair/typebox";
import createUserWithRoles from "src/app/admin/auth/create-user-with-roles";
import scrapeMovie from "src/app/admin/movies/scrape/scrape-movie";
import { userLogin } from "src/app/auth/login";
import { listMovies } from "src/app/movies/list-movies";

const apiRoutes: RoutesObject = {
	"POST /auth/register": [
		routeHandlerMiddleware({
			handler: async ({ body }) => {
				try {
					const { email, password } = body;
					return await createUserWithRoles({
						email,
						password,
						roles: [UserRoles.USER],
					});
				} catch (error) {
					throw error;
				}
			},
			schema: {
				request: {
					body: UserRegisterSchema,
				},
				response: UserRegisterResponseSchema,
			},
			options: {
				paginated: false,
				successStatus: 201,
			},
		}),
	],
	"POST /auth/login": [
		routeHandlerMiddleware({
			handler: async ({ body }, req) => {
				try {
					const { email, password } = body;
					return await userLogin({ email, password }, String(req.id));
				} catch (error) {
					if (error instanceof ApiError) {
						if (
							error.isCode([
								"invalid_login",
								"invalid_role_value",
								"unauthorized",
							])
						) {
							throw new HttpUnauthorizedError(
								error.code,
								error.message
							);
						}
					}

					throw error;
				}
			},
			schema: {
				request: {
					body: UserLoginSchema,
				},
				response: UserLoginResponseSchema,
			},
			options: {
				paginated: false,
				successStatus: 200,
			},
		}),
	],
	"GET /auth/check": [
		routeHandlerMiddleware({
			handler: async (_, req) => {
				const jwt = await decodeJwtFromRequest(req);
				return jwt as AuthJwtPayload;
			},
			schema: {
				response: AuthJwtPayload,
				request: {},
			},
			options: {
				paginated: false,
				successStatus: 200,
			},
		}),
	],
	"POST /admin/auth/create-user": [
		hasRole([UserRoles.ADMIN, UserRoles.SYSTEM]),
		routeHandlerMiddleware({
			handler: async ({ body }) => {
				try {
					const { email, password, roles } = body;
					return await createUserWithRoles({
						email,
						password,
						roles,
					});
				} catch (error) {
					throw error;
				}
			},
			schema: {
				request: {
					body: AdminCreateUserSchema,
				},
				response: UserRegisterResponseSchema,
			},
			options: {
				paginated: false,
				successStatus: 201,
			},
		}),
	],
	"POST /admin/movies/scrape": [
		hasRole(UserRoles.ADMIN),
		routeHandlerMiddleware({
			handler: async ({ body }) => {
				try {
					const { title, sourceUrls } = body;
					const response = await scrapeMovie({ title, sourceUrls });
					return response;
				} catch (error) {
					if (error instanceof ApiError) {
						if (error.isCode("scraping_not_allowed")) {
							throw new HttpForbiddenError(error.code, error.msg);
						} else if (
							error.isCode([
								"scraping_source_not_supported",
								"scraping_source_no_rating",
							])
						) {
							throw new HttpInvalidDataError(
								error.code,
								error.msg
							);
						}
					}
					throw error;
				}
			},
			schema: {
				request: {
					body: ScrapeMovieSchema,
				},
				response: Type.Any(),
			},
		}),
	],
	"GET /movies": [
		hasJwt(),
		routeHandlerMiddleware({
			handler: async (payload) => {
				const response = await listMovies(
					payload.query,
					payload.pagination
				);
				return response;
			},
			schema: {
				request: {
					query: QueryMoviesSchema,
				},
				response: ListMoviesSchema,
			},
			options: {
				paginated: true,
				cache: {
					// tagging cache for invalidation
					tags: ["list_movies"],
					// response caching for 60s
					ttl: 60_000,
				},
			},
		}),
	],
};

export default apiRoutes;
