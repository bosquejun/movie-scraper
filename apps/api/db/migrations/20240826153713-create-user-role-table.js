require("ts-node/register");
const { default: UserRole } = require("../../src/model/entities/user-role");

module.exports = {
	async up(queryInterface) {
		UserRole.load(queryInterface.sequelize);
		await queryInterface.createTable(
			UserRole.tableName,
			UserRole.getAttributes()
		);

		for (const { fields, ...indexOptions } of UserRole.options.indexes) {
			await queryInterface.addIndex(
				UserRole.tableName,
				fields,
				indexOptions
			);
		}
	},
	async down(queryInterface) {
		UserRole.load(queryInterface.sequelize);
		await queryInterface.dropTable(UserRole.tableName);
	},
};
