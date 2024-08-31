import { BaseEntity, EntityMetadata, HasManyMixin } from "@comeback/model";
import { hashPassword } from "@comeback/utils";
import { DataTypes, NonAttribute } from "sequelize";
import UserRole from "./user-role";

interface User
	extends HasManyMixin<UserRole, number, "UserRole", "UserRoles"> {}
class User extends BaseEntity<User> {
	static metadata: EntityMetadata<User> = {
		attributes: {
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		initOptions: {
			indexes: [
				{
					fields: ["email", "password"],
				},
			],
			deletedAt: true,
		},
	};
	declare email: string;
	declare password: string;
	declare UserRoles: NonAttribute<UserRole[]>;

	static associate(): void {
		this.belongsToMany(UserRole, {
			through: "UserAclRole",
			foreignKey: "userId",
		});
	}

	static onLoad(): void {
		this.addHook("beforeSave", async (user: User) => {
			if (user.changed("password")) {
				user.password = await hashPassword(user.password);
			}
		});
	}
}

export default User;
