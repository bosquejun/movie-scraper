import { Static, Type } from "@sinclair/typebox";
import { MovieSchema } from ".";

export const QueryMoviesSchema = Type.Partial(
	Type.Intersect([
		Type.Pick(MovieSchema, ["title"]),
		Type.Object({
			movieId: Type.String({
				pattern: "^[0-9]+$",
			}),
		}),
	])
);

export type QueryMoviesSchema = Static<typeof QueryMoviesSchema>;
