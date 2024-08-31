import { Type } from "@sinclair/typebox";

export const BaseEntitySchema = Type.Object({
	id: Type.Number(),
	createdAt: Type.Optional(Type.String({ format: "date-time" })),
	updatedAt: Type.Optional(Type.String({ format: "date-time" })),
});
