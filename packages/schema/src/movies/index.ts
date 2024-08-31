import { Static, Type } from "@sinclair/typebox";
import { Nullable } from "../common";
import { BaseEntitySchema } from "../common/base-entity";
import { createResponseSchemaObject } from "../express/response";
import { MovieRatingSchema, type MovieRatingSchemaType } from "./ratings";

export const MovieSchema = Type.Intersect([
	BaseEntitySchema,
	Type.Object({
		title: Type.String(),
		averageRating: Type.Number(),
		ratings: Nullable(
			Type.Array(
				Type.Pick(MovieRatingSchema, [
					"id",
					"ratingScore",
					"source",
					"url",
				])
			)
		),
		releaseDate: Nullable(Type.String()),
		director: Nullable(Type.String()),
		movieRating: Nullable(Type.String()),
		movieRuntime: Nullable(Type.String()),
		posterImage: Nullable(Type.String()),
		synopsis: Nullable(Type.String()),
	}),
]);

export type MovieSchemaType = Static<typeof MovieSchema>;

export const GetMovieSchemaResponse = createResponseSchemaObject(MovieSchema);

export type GetMovieSchemaResponseType = Static<typeof GetMovieSchemaResponse>;

export const ListMoviesSchema = Type.Array(MovieSchema);

export type ListMoviesSchema = Static<typeof ListMoviesSchema>;

export const ListMovieSchemaResponse = createResponseSchemaObject(
	MovieSchema,
	true
);

export type ListMovieSchemaResponse = Static<typeof ListMovieSchemaResponse>;

export const ScrapeMovieSchema = Type.Object({
	title: Type.String(),
	sourceUrls: Type.Array(Type.String({ format: "uri" })),
});

export type ScrapeMovieSchema = Static<typeof ScrapeMovieSchema>;

export { MovieRatingSchema, MovieRatingSchemaType };
