import {
	Static,
	TArray,
	TNull,
	TObject,
	TSchema,
	TString,
	Type,
} from "@sinclair/typebox";
import { Nullable } from "../common";
import { PaginationSchema } from "./requests";

export const PaginatedResponse = Type.Intersect([
	Type.Pick(PaginationSchema, ["pageSize"]),
	Type.Object({
		count: Type.Number(),
		totalCount: Type.Number(),
		currentPage: Type.Number(),
		nextPage: Nullable(Type.Number()),
		prevPage: Nullable(Type.Number()),
	}),
]);

export type PaginatedResponse = Static<typeof PaginatedResponse>;

type TObjectResponse<T extends TSchema> = TObject<{
	status: TSchema;
	errors:
		| TNull
		| TArray<
				TObject<{
					code: TSchema;
					message: TSchema;
				}>
		  >;
	date: TString;
	data: TNull | T;
}>;

type TPaginatedResponse<T extends TSchema> = TObject<{
	status: TSchema;
	errors:
		| TNull
		| TArray<
				TObject<{
					code: TSchema;
					message: TSchema;
				}>
		  >;
	date: TString;
	data: TNull | T extends TArray ? T : TArray<T>;
	pagination: typeof PaginatedResponse;
}>;

export function createResponseSchemaObject<
	T extends TSchema,
	TPaginated extends boolean = false,
>(
	properties: T,
	paginated?: TPaginated
): TPaginated extends true ? TPaginatedResponse<T> : TObjectResponse<T> {
	const schema = Type.Object({
		status: Type.String(),
		data: Nullable(
			paginated && (properties as any).type !== "array"
				? Type.Array(properties)
				: properties
		),
		...(paginated && {
			pagination: Type.Optional(PaginatedResponse),
		}),
		errors: Nullable(
			Type.Array(
				Type.Object({
					code: Type.String(),
					message: Type.String(),
				})
			)
		),
		date: Type.String({ format: "date-time" }),
	});

	return schema as any;
}

export const GenericResponseSchema = Type.Object({
	message: Type.String(),
});

export type GenericResponseSchema = Static<typeof GenericResponseSchema>;

export const GenericAPIResponseSchema = createResponseSchemaObject(
	GenericResponseSchema
);

export type GenericAPIResponseSchema = Static<typeof GenericAPIResponseSchema>;
