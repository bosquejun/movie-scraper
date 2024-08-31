import { GENERIC_HTTP_ERROR_MESSAGE, HttpRequestError } from "@comeback/errors";

type RequestErrorData = {
	code: string;
	message: string;
	status: "FAILED" | "ERROR";
	statusCode: number;
};

export function getErrorData(
	error: Error | HttpRequestError
): RequestErrorData {
	const errorData: RequestErrorData = {
		status: "FAILED",
		code: "internal_error",
		message: GENERIC_HTTP_ERROR_MESSAGE,
		statusCode: 500,
	};
	if (error instanceof HttpRequestError) {
		if (error.statusCode < 500) {
			errorData.status = "ERROR";
		}
		errorData.code = error.code;
		errorData.message = error.message;
		errorData.statusCode = error.statusCode;
	}

	return errorData;
}
