import { BaseEntity, EntityMetadata, HasManyMixin } from "@comeback/model";
import { DataTypes } from "sequelize";
import User from "./user";

interface UserRole extends HasManyMixin<User, number, "User", "Users"> {}
class UserRole extends BaseEntity<UserRole> {
	declare name: string;
	declare description: string | null;

	static metadata: EntityMetadata<UserRole> = {
		attributes: {
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
	};

	static associate(): void {
		this.belongsToMany(User, {
			through: "UserAclRole",
			foreignKey: "roleId",
		});
	}
}

export default UserRole;
