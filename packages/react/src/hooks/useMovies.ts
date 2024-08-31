import {
	checkDataSchemaErrors,
	ListMovieSchemaResponse,
	PaginatedResponse,
} from "@comeback/schema";
import { useCallback, useEffect, useState } from "react";
import { useComebackApi } from "../context";
import { useAccessToken } from "./useAccessToken";
import { useFetch } from "./useFetch";

type DefaultOptions = {
	pageSize?: number;
};

export function useMovies(options: DefaultOptions = { pageSize: 5 }) {
	const context = useComebackApi();
	const { token, loading } = useAccessToken(context.isHealthy);
	const [state, setState] = useState<{
		movies: ListMovieSchemaResponse["data"];
		error: string | null;
		pagination: PaginatedResponse | null;
	}>({
		pagination: null,
		error: null,
		movies: [],
	});
	const fetch = useFetch<ListMovieSchemaResponse>(
		`${context.getApiBaseUrl()}/movies?page=${state.pagination?.currentPage || 1}&pageSize=${options.pageSize}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
			enabled: Boolean(!loading && token),
		}
	);

	useEffect(() => {
		const { loading, data, error } = fetch;
		if (loading) return;
		let _error = error;
		if (!error && data) {
			const errors = checkDataSchemaErrors<ListMovieSchemaResponse>(
				ListMovieSchemaResponse,
				data
			);

			if (errors?.length) {
				_error = "Received invalid response schema";
			}
		}

		setState((prev) => ({
			...prev,
			error: _error,
			...(data?.data.length && {
				movies: data.data,
			}),
			...(data?.pagination && {
				pagination: data.pagination,
			}),
		}));
	}, [fetch.loading]);

	const moveCursor = useCallback(
		(nextPage: number) => {
			if (!state?.pagination) return;
			setState((prev) => ({
				...prev,
				...(prev.pagination && {
					pagination: {
						...prev.pagination,
						currentPage: nextPage,
					},
				}),
			}));
		},
		[state?.pagination]
	);

	return {
		loading: fetch.loading,
		...state,
		nextPage: state?.pagination?.nextPage
			? moveCursor.bind(undefined, state?.pagination?.nextPage)
			: null,
		prevPage: state?.pagination?.prevPage
			? moveCursor.bind(undefined, state?.pagination?.prevPage)
			: null,
		refetch: fetch.refetch,
	};
}
