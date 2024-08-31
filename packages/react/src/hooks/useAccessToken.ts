import { UserLoginAPIResponseSchema, UserLoginSchema } from "@comeback/schema";
import { useCallback, useEffect, useState } from "react";
import { useComebackApi } from "../context";
import { useMutate } from "./useMutate";

export function useAccessToken(autoFetch = false) {
	const context = useComebackApi();
	const [token, setToken] = useState<string | null>(null);
	const { data, mutate, loading, error, mutateAsync } = useMutate<
		UserLoginSchema,
		UserLoginAPIResponseSchema
	>("post", `${context.getApiBaseUrl()}/auth/login`, {});

	const fetchAccessToken = useCallback(
		(credentiasl: UserLoginSchema) => {
			mutate(credentiasl);
		},
		[mutate, context.getClientCredentials()]
	);

	useEffect(() => {
		if (autoFetch) fetchAccessToken(context.getClientCredentials());
	}, [autoFetch]);

	useEffect(() => {
		if (loading) return;
		if (!error) {
			setToken(data?.data?.token!);
		}
	}, [loading]);

	return {
		token,
		loading,
		error,
		fetchToken: mutate,
		fetchTokenAsync: mutateAsync,
	};
}
