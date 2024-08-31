import {
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	InitOptions,
	Model,
	ModelAttributes,
	Sequelize,
} from "sequelize";
import sequelize from "./config";

export type EntityMetadataAttributes<TEntity extends Model> = Omit<
	ModelAttributes<BaseEntity<TEntity>, InferAttributes<TEntity>>,
	"id" | "createdAt" | "updatedAt" | "metadata"
>;

export type EntityMetadata<TEntity extends Model> = {
	attributes: EntityMetadataAttributes<TEntity>;
	initOptions?: Omit<InitOptions<TEntity>, "sequelize">;
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

export abstract class BaseEntity<TEntity extends Model> extends Model<
	InferAttributes<TEntity>,
	Omit<InferCreationAttributes<TEntity>, "id" | "createdAt" | "updatedAt">
> {
	declare id: number;
	declare createdAt: Date;
	declare updatedAt: Date;

	static metadata: EntityMetadata<any>;

	static associate() {}

	static load(_sequelize?: Sequelize) {
		const { attributes, initOptions } = this.metadata;
		super.init(
			{
				...getBaseEntityAttributes(),
				...attributes,
			},
			{
				timestamps: true,
				...(initOptions || {}),
				modelName: this.name,
				tableName: this.name,
				sequelize: _sequelize || sequelize,
			}
		);

		this.onLoad();
	}

	static onLoad() {}
}
