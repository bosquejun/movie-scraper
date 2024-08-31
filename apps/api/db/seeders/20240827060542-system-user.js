"use strict";

require("ts-node/register");
const { UserRoles } = require("@comeback/types");
const { default: User } = require("../../src/model/entities/user");
const {
	default: UserAclRole,
} = require("../../src/model/entities/user-acl-role");
const { default: UserRole } = require("../../src/model/entities/user-role");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		[User, UserRole, UserAclRole].forEach((model) => {
			model.load(queryInterface.sequelize);
		});
		[User, UserRole, UserAclRole].forEach((model) => {
			model.associate();
		});

		await queryInterface.sequelize.transaction(async (transaction) => {
			const user = await User.create(
				{
					email: "system@comeback.com",
					password: "password@1234!",
				},
				{
					transaction,
					include: {
						model: UserRole,
					},
				}
			);

			const role = await UserRole.findOne({
				where: {
					name: UserRoles.SYSTEM,
				},
				transaction,
			});

			await user.addUserRole(role, { transaction });
		});

		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
