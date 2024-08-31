import { DataTypes, Model, ModelAttributes } from "sequelize";

export type CreateEntityModel<
	TAttr extends {} = any,
	TCreateAttr extends {} = any,
> = {
	name: string;
	attributes: ModelAttributes<Model<TAttr, TCreateAttr>, TAttr>;
};

export type BaseEntityAttributes = {
	id: number;
	createdAt: Date;
	updatedAt: Date;
};

export function getBaseEntityAttributes(): ModelAttributes<
	Model<Pick<BaseEntityAttributes, "id">, {}>,
	Pick<BaseEntityAttributes, "id">
> {
	return {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
	};
}
