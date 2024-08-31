/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import { getApiError, getDefaultAxiosConfig } from "../utils";

interface MutateState<T> {
	data: T | null;
	loading: boolean;
	error: string | null;
}

export function useMutate<TRequestData, TResponse = any>(
	method: "post" | "put" | "delete",
	url: string,
	config?: AxiosRequestConfig
): MutateState<TResponse> & {
	mutate: (requestData: TRequestData) => void;
	mutateAsync: (requestData: TRequestData) => Promise<{
		data: TResponse | null;
		loading: boolean;
		error: null | string;
	}>;
} {
	const [state, setState] = useState<MutateState<TResponse>>({
		data: null,
		loading: false,
		error: null,
	});

	const mutateData = useCallback(
		async function (requestData: TRequestData) {
			setState({ data: null, loading: true, error: null });
			try {
				const response: AxiosResponse<TResponse> = await axios[method](
					url,
					requestData,
					{
						...getDefaultAxiosConfig(),
						...config,
					}
				);
				setState({ data: response.data, loading: false, error: null });
				return { data: response.data, loading: false, error: null };
			} catch (error) {
				const { message } = getApiError(error);
				setState({
					data: null,
					loading: false,
					error: message,
				});
				return {
					data: null,
					loading: false,
					error: message,
				};
			}
		},
		[url, config]
	);

	return {
		...state,
		mutate: mutateData,
		mutateAsync: async (reqData: TRequestData) => {
			const response = await mutateData(reqData);

			return response;
		},
	};
}
