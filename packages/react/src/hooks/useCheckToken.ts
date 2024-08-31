import {
	AuthJwtPayloadAPIResponse,
	checkDataSchemaErrors,
} from "@comeback/schema";
import { useMemo } from "react";
import { useComebackApi } from "../context";
import { useFetch } from "./useFetch";

export function useCheckToken(token: string | null) {
	const context = useComebackApi();
	const response = useFetch<AuthJwtPayloadAPIResponse>(
		`${context.getApiBaseUrl()}/auth/check`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
			enabled: Boolean(token),
		}
	);

	const validatedResponse = useMemo(() => {
		const { loading, data, error, refetch } = response;

		if (loading)
			return {
				loading,
				error,
				refetch,
				jwtPayload: null,
			};

		let _error = error;
		if (!error && data) {
			const errors = checkDataSchemaErrors<AuthJwtPayloadAPIResponse>(
				AuthJwtPayloadAPIResponse,
				data
			);

			if (errors?.length) {
				_error = "Received invalid response schema";
			}
		}

		return {
			jwtPayload: data?.data,
			error: _error,
			loading,
			refetch,
		};
	}, [response.loading]);

	return validatedResponse;
}
