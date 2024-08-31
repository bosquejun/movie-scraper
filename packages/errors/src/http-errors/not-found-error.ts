import { HttpRequestError } from "./request-error";

export class HttpNotFoundError extends HttpRequestError {
	constructor(
		public code: string = "not_found",
		message = "Resource not found"
	) {
		super(404, code, message);
	}
}
