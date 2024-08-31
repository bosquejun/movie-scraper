import { HttpRequestError } from "./request-error";

export class HttpUnauthorizedError extends HttpRequestError {
	constructor(
		public code: string = "unauthorized",
		message = "Not allowed to access resource"
	) {
		super(401, code, message);
	}
}
