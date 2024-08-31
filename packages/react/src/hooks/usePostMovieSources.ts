import { ScrapeMovieSchema } from "@comeback/schema";
import { TAny } from "@sinclair/typebox";
import { useComebackApi } from "../context";
import { useMutate } from "./useMutate";

export function usePostMovieSources(token: string) {
	const context = useComebackApi();
	const { data, mutate, loading, error, mutateAsync } = useMutate<
		ScrapeMovieSchema,
		TAny
	>("post", `${context.getApiBaseUrl()}/admin/movies/scrape`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return {
		data,
		loading,
		error,
		mutate,
		mutateAsync,
	};
}
