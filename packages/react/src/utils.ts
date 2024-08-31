import axios from "axios";

export function getApiError(error: unknown) {
	const errorData = {
		code: "generic_error",
		message: "Unknown error.",
	};
	if (axios.isAxiosError(error) && error.response?.data?.errors?.length) {
		const [firstError] = error.response?.data?.errors;
		errorData["code"] = firstError?.code;
		errorData["message"] = firstError?.message;
	}

	return errorData;
}
