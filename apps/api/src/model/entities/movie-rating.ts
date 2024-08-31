import { BaseEntity, BelongsToMixin, EntityMetadata } from "@comeback/model";
import { CacheClient } from "@comeback/redis";
import { DataTypes } from "sequelize";
import Movie from "./movie";

interface MovieRating extends BelongsToMixin<Movie, number, "Movie"> {}
class MovieRating extends BaseEntity<MovieRating> {
	static metadata: EntityMetadata<MovieRating> = {
		attributes: {
			movieId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Movie",
					key: "id",
				},
			},
			url: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			source: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			ratingScore: {
				type: DataTypes.FLOAT,
				allowNull: false,
				defaultValue: 0,
			},
			// Define a virtual field for the average rating
			// averageRating: {
			// 	type: DataTypes.VIRTUAL,
			// 	get() {
			// 		const sequelize = this.sequelize;
			// 		return sequelize.fn(
			// 			"AVG",
			// 			sequelize.col("movie_ratings.rating")
			// 		);
			// 	},
			// },
		},
		initOptions: {
			indexes: [
				{
					unique: true,
					fields: ["movieId", "source"],
				},
				{
					fields: ["movieId"],
				},
				{ fields: ["ratingScore"] },
			],
		},
	};
	declare movieId: number;
	declare url: string;
	declare source: string;
	declare ratingScore: number;

	static associate(): void {
		this.belongsTo(Movie, {
			foreignKey: "movieId",
		});
	}

	static onLoad(): void {
		this.addHook("afterCreate", this.handleMovieInvalidation);
		this.addHook("afterUpdate", this.handleMovieInvalidation);
	}

	private static async handleMovieInvalidation() {
		console.log(
			`<<model:${this.name}:hook>>: Invalidating 'list_movies' cache`
		);
		const cache = new CacheClient();
		await cache.invalidateByTags("list_movies");
	}
}

export default MovieRating;
