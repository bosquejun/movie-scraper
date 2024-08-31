import { BaseEntity, EntityMetadata, HasManyMixin } from "@comeback/model";
import { CacheClient } from "@comeback/redis";
import { DataTypes, NonAttribute } from "sequelize";
import MovieRating from "./movie-rating";

interface Movie
	extends HasManyMixin<MovieRating, number, "MovieRating", "MovieRatings"> {}
class Movie extends BaseEntity<Movie> {
	static metadata: EntityMetadata<Movie> = {
		attributes: {
			title: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			averageRating: {
				type: DataTypes.VIRTUAL,
				defaultValue: 0,
			},
			releaseDate: {
				type: DataTypes.STRING,
			},
			director: {
				type: DataTypes.STRING,
			},
			movieRating: {
				type: DataTypes.STRING,
			},
			movieRuntime: {
				type: DataTypes.STRING,
			},
			posterImage: {
				type: DataTypes.STRING,
			},
			synopsis: {
				type: DataTypes.TEXT,
			},
		},
	};
	declare title: string;
	declare releaseDate?: string;
	declare director?: string;
	declare movieRating?: string;
	declare movieRuntime?: string;
	declare averageRating?: number;
	declare ratings?: NonAttribute<MovieRating[]>;
	declare posterImage?: string;
	declare synopsis?: string;

	static associate(): void {
		this.hasMany(MovieRating, {
			foreignKey: "movieId",
			as: "ratings",
		});
	}

	static onLoad(): void {
		this.addHook("afterFind", (movies: Movie | Movie[]) => {
			if (Array.isArray(movies)) {
				movies.forEach((movie) => {
					if (movie.ratings?.length) {
						const averageRating = +(
							movie.ratings?.reduce(
								(sum: number, movieRating) =>
									sum + movieRating.ratingScore,
								0
							) / movie.ratings.length
						).toFixed(1);
						movie.setDataValue("averageRating", averageRating);
						return;
					}
				});
			}
		});

		this.addHook("afterCreate", this.handleMovieInvalidation);
		this.addHook("afterUpdate", this.handleMovieInvalidation);
	}

	private static async handleMovieInvalidation() {
		const cache = new CacheClient();
		await cache.invalidateByTags("list_movies");
	}
}

export default Movie;
