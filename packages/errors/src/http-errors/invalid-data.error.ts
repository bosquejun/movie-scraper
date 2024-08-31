import { HttpRequestError } from "./request-error";

export class HttpInvalidDataError extends HttpRequestError {
	constructor(
		public code: string = "invalid_data",
		message = "Invalid request data"
	) {
		super(400, code, message);
	}
}
