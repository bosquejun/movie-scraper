/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { getApiError, getDefaultAxiosConfig } from "../utils";

interface FetchState<T> {
	data: T | null;
	loading: boolean;
	error: string | null;
}

export function useFetch<T = any>(
	url: string,
	config?: AxiosRequestConfig & {
		enabled?: boolean;
	}
): FetchState<T> & { refetch: () => void } {
	const [state, setState] = useState<FetchState<T>>({
		data: null,
		loading: true,
		error: null,
	});

	const fetchData = useCallback(async () => {
		if (config?.enabled === false) return;
		setState({ data: null, loading: true, error: null });
		try {
			const response: AxiosResponse<T> = await axios.get(url, {
				...getDefaultAxiosConfig(),
				...config,
			});
			setState({ data: response.data, loading: false, error: null });
		} catch (error) {
			const { message } = getApiError(error);

			setState({
				data: null,
				loading: false,
				error: message,
			});
		}
	}, [url, config?.enabled]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return { ...state, refetch: fetchData };
}
