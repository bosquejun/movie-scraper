"use strict";

require("ts-node/register");
const { default: UserRole } = require("../../src/model/entities/user-role");

const roles = [
	{
		name: "system",
		description: "System user role for app integrations",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		name: "admin",
		description: "User role for admin users",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		name: "user",
		description: "User role for common users",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		UserRole.load(queryInterface.sequelize);

		await queryInterface.bulkInsert(UserRole.tableName, roles);
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
		UserRole.load(queryInterface.sequelize);
		return queryInterface.bulkDelete(UserRole.tableName, null, {});

		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
