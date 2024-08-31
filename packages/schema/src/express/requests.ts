import { Static, TSchema, Type } from "@sinclair/typebox";

export const PaginationSchema = Type.Object({
	page: Type.Number(),
	pageSize: Type.Number(),
});

export type PaginationSchema = Static<typeof PaginationSchema>;

export function createPaginatedQueryRequest<T extends TSchema>(properties: T) {
	return Type.Intersect([properties, PaginationSchema]);
}
