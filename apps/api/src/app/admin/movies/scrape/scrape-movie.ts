import { sequelize } from "@comeback/model";
import MovieRating from "../../../..//model/entities/movie-rating";
import Movie from "../../../../model/entities/movie";
import { getScrapedMovie } from "./movie-scrapers";

export type PostScrapeMovie = {
	title: string;
	sourceUrls: string[];
};

export type ScrapeMovieData = {
	ratingScore: number;
	source: string;
	url: string;
	posterImage?: string;
	releaseDate?: string;
	movieRating?: string;
	director?: string;
	movieRuntime?: string;
	synopsis?: string;
};

export default async function scrapeMovie(scrapeRequest: PostScrapeMovie) {
	const movies = await getScrapedMovie(scrapeRequest.sourceUrls);

	for (const movieData of movies) {
		if (!movieData) continue;
		await sequelize.transaction(async (transaction) => {
			const movie = await Movie.findOne({
				where: {
					title: scrapeRequest.title,
				},
				transaction,
			});
			let movieId: number;
			if (!movie) {
				const movie = await Movie.create(
					{
						title: scrapeRequest.title,
						director: movieData.director,
						movieRuntime: movieData.movieRuntime,
						movieRating: movieData.movieRating,
						releaseDate: movieData.releaseDate,
						posterImage: movieData.posterImage,
						synopsis: movieData.synopsis,
					},
					{ transaction }
				);
				movieId = movie.id;
			} else {
				movieId = movie.id;
				// fill missing movie metadata
				const updatedData = {
					...Object.fromEntries(
						Object.entries(movieData).filter(
							([key, value]) =>
								(movie.toJSON() as any)[key] === undefined ||
								(movie.toJSON() as any)[key] === null ||
								(movie.toJSON() as any)[key] === ""
						)
					),
				};
				await Movie.update(updatedData, {
					where: {
						id: movieId,
					},
					transaction,
				});
			}

			const rating = await MovieRating.findOne({
				where: {
					source: movieData.source,
					movieId,
				},
				transaction,
			});

			// update if existing rating, otherwise create new rating record
			if (rating) {
				await MovieRating.update(
					{ ratingScore: movieData.ratingScore },
					{
						where: {
							id: rating.id,
						},
						transaction,
					}
				);

				await rating.save({ transaction });
			} else {
				await MovieRating.create(
					{
						ratingScore: movieData.ratingScore,
						source: movieData.source,
						url: movieData.url,
						movieId,
					},
					{ transaction }
				);
			}
		});
	}

	return movies;
	// return {
	// 	message: "Submitted scraping request successfully",
	// };
}
