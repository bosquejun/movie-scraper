import {
	Model,
	type BelongsToCreateAssociationMixin,
	type BelongsToGetAssociationMixin,
	type BelongsToSetAssociationMixin,
	type HasManyAddAssociationMixin,
	type HasManyAddAssociationsMixin,
	type HasManyCountAssociationsMixin,
	type HasManyCreateAssociationMixin,
	type HasManyGetAssociationsMixin,
	type HasManyHasAssociationMixin,
	type HasManyHasAssociationsMixin,
	type HasManyRemoveAssociationMixin,
	type HasManyRemoveAssociationsMixin,
	type HasManySetAssociationsMixin,
} from "sequelize";

// define helper types
type PostfixProperties<PropTypes, Postfix extends string> = {
	[P in keyof PropTypes as `${Exclude<P, symbol>}${Postfix}`]: PropTypes[P];
};

type Prettify<T> = { [P in keyof T]: T[P] };

// association mixin interfaces
export type BelongsToMixin<
	AssociatedModel extends Model,
	PrimaryKeyType,
	Name extends string,
> = PostfixProperties<
	{
		get: BelongsToGetAssociationMixin<AssociatedModel>;
		set: BelongsToSetAssociationMixin<AssociatedModel, PrimaryKeyType>;
		create: BelongsToCreateAssociationMixin<AssociatedModel>;
	},
	Capitalize<Name>
>;

export type HasManyMixin<
	AssociatedModel extends Model,
	PrimaryKeyType,
	SingularName extends string,
	PluralName extends string,
> = Prettify<
	PostfixProperties<
		{
			get: HasManyGetAssociationsMixin<AssociatedModel>;
			count: HasManyCountAssociationsMixin;
			has: HasManyHasAssociationsMixin<AssociatedModel, PrimaryKeyType>;
			set: HasManySetAssociationsMixin<AssociatedModel, PrimaryKeyType>;
			add: HasManyAddAssociationsMixin<AssociatedModel, PrimaryKeyType>;
			remove: HasManyRemoveAssociationsMixin<
				AssociatedModel,
				PrimaryKeyType
			>;
		},
		Capitalize<PluralName>
	> &
		PostfixProperties<
			{
				has: HasManyHasAssociationMixin<
					AssociatedModel,
					PrimaryKeyType
				>;
				add: HasManyAddAssociationMixin<
					AssociatedModel,
					PrimaryKeyType
				>;
				remove: HasManyRemoveAssociationMixin<
					AssociatedModel,
					PrimaryKeyType
				>;
				create: HasManyCreateAssociationMixin<AssociatedModel>;
			},
			Capitalize<SingularName>
		>
>;
