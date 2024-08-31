import { AxiosError } from "axios";
import { GENERIC_HTTP_ERROR_MESSAGE } from ".";

export class HttpRequestError extends AxiosError {
	constructor(
		public statusCode: number,
		public code: string = "internal_error",
		message = GENERIC_HTTP_ERROR_MESSAGE
	) {
		super(message, code);
	}
}
