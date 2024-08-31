import { ApiError } from "@comeback/errors";
import { sequelize, serializeModel } from "@comeback/model";
import { UserSchema } from "@comeback/schema";
import { InferCreationAttributes, Op } from "sequelize";
import User from "src/model/entities/user";
import UserRole from "src/model/entities/user-role";

export type CreateUserWithRoles = Pick<
	InferCreationAttributes<User>,
	"email" | "password"
> & {
	roles: string[];
};

export default async function createUserWithRoles({
	roles,
	...userInfo
}: CreateUserWithRoles) {
	return sequelize.transaction(async (transaction) => {
		const user = await User.create(userInfo);
		const _roles = await UserRole.findAll({
			where: {
				name: {
					[Op.in]: roles,
				},
			},
			transaction,
		});

		const nonExistingRoles = roles.filter(
			(r) => !_roles.some((_r) => _r.name === r)
		);

		if (nonExistingRoles.length) {
			throw new ApiError(
				"invalid_role_value",
				`Role provided not supported: ${nonExistingRoles.join(",")}`
			);
		}

		await user.addUserRoles(_roles);

		const { password, ...userDetails } = serializeModel<User, UserSchema>(
			user
		);

		return userDetails;
	});
}
