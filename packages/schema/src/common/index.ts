import { TSchema, Type } from "@sinclair/typebox";

export * from "./base-entity";

export const Nullable = <T extends TSchema>(schema: T) =>
	Type.Union([schema, Type.Null()]);
