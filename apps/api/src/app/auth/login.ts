import { ApiError } from "@comeback/errors";
import { issueJwt, verifyPassword } from "@comeback/utils";
import { InferAttributes } from "sequelize";
import appConfig from "src/config/app";
import User from "src/model/entities/user";
import UserRole from "src/model/entities/user-role";

export type UserLogin = Pick<InferAttributes<User>, "email" | "password">;

export async function userLogin(userDetails: UserLogin, requestId: string) {
	const user = await User.findOne({
		where: {
			email: userDetails.email,
		},
		include: [
			{
				model: UserRole,
			},
		],
	});
	const roles = user?.UserRoles.map((ur) => ur.name);

	if (!user) {
		throw new ApiError("invalid_login", "Email or password doesn't exist.");
	}

	if (!(await verifyPassword(userDetails.password, user.password))) {
		throw new ApiError("invalid_login", "Email or password doesn't exist.");
	}

	const token = issueJwt(
		{
			roles,
		},
		appConfig.auth.secret,
		{
			subject: String(user.id),
			jwtid: requestId,
			issuer: "cmbck/auth",
		}
	);

	return {
		token,
	};
}
