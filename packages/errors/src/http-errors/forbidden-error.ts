import { HttpRequestError } from "./request-error";

export class HttpForbiddenError extends HttpRequestError {
	constructor(
		public code: string = "forbidden",
		message = "Forbidden to access resource"
	) {
		super(403, code, message);
	}
}
