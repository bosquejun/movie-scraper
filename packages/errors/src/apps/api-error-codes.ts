import { createAppError } from "../app-errors";

export type ApiErrorCodes =
	| "scraping_not_allowed"
	| "scraping_source_not_supported"
	| "scraping_source_no_rating"
	// auth errors
	| "invalid_role_value"
	| "invalid_login"
	| "unauthorized";

export class ApiError extends createAppError<ApiErrorCodes>() {}
