import { type Static, Type } from "@sinclair/typebox";
import { BaseEntitySchema } from "../common/base-entity";

export const MovieRatingSchema = Type.Intersect([
	BaseEntitySchema,
	Type.Object({
		ratingScore: Type.Number(),
		source: Type.String(),
		url: Type.String(),
	}),
]);

export type MovieRatingSchemaType = Static<typeof MovieRatingSchema>;
