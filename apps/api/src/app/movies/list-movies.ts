// import MovieView from "src/model/entities/movie-view";

import { paginate, serializeModels } from "@comeback/model";
import {
	ListMoviesSchema,
	PaginationSchema,
	QueryMoviesSchema,
} from "@comeback/schema";
import Movie from "src/model/entities/movie";
import MovieRating from "src/model/entities/movie-rating";

export async function listMovies(
	query: QueryMoviesSchema,
	pagination: PaginationSchema
) {
	const { count: totalCount, rows: result } = await Movie.findAndCountAll(
		paginate({
			where: {
				...(query?.movieId && {
					id: query?.movieId,
				}),
			},
			order: [["createdAt", "DESC"]],
			include: [
				{
					model: MovieRating,
					as: "ratings",
					attributes: ["id", "ratingScore", "source", "url"],
				},
			],
			distinct: true,
			...pagination,
		})
	);
	const data = serializeModels<Movie, ListMoviesSchema>(result);

	return {
		totalCount,
		result: data,
	};
}
