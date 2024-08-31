import { BaseEntity, EntityMetadata } from "@comeback/model";
import { DataTypes } from "sequelize";

class UserAclRole extends BaseEntity<UserAclRole> {
	static metadata: EntityMetadata<UserAclRole> = {
		attributes: {
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					key: "id",
					model: "User",
				},
			},
			roleId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					key: "id",
					model: "UserRole",
				},
			},
			enabled: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
		},
		initOptions: {
			indexes: [
				{
					fields: ["roleId", "userId"],
					unique: true,
				},
			],
		},
	};
	declare userId: number;
	declare roleId: number;
	declare enabled: boolean;
}

export default UserAclRole;
