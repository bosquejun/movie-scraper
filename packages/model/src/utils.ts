import { PaginationSchema } from "@comeback/schema";
import { Static, TSchema } from "@sinclair/typebox";
import { Model } from "sequelize";

export function serializeModel<M extends Model, T extends Static<TSchema>>(
	model: M
) {
	const json = model.toJSON() as T;
	for (const k in json) {
		if (json[k] instanceof Date) {
			(json as any)[k] = json[k].toISOString();
		}
	}

	return json;
}

export function serializeModels<M extends Model, T extends Static<TSchema>>(
	models: M | M[]
): T {
	if (Array.isArray(models)) {
		// Serialize each model in the array
		return models.map((model) => serializeModel(model)) as T;
	} else {
		// Serialize a single model
		return [serializeModel(models)] as T;
	}
}

export function paginate<T>({
	page,
	pageSize,
	...query
}: T & PaginationSchema) {
	const limit = pageSize;
	const offset = (page - 1) * limit;
	return {
		...query,
		limit,
		offset,
	};
}
