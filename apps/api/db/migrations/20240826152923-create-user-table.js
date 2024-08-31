require("ts-node/register");
const { default: User } = require("../../src/model/entities/user");

module.exports = {
	async up(queryInterface) {
		User.load(queryInterface.sequelize);
		await queryInterface.createTable(User.tableName, User.getAttributes());

		for (const { fields, ...indexOptions } of User.options.indexes) {
			await queryInterface.addIndex(User.tableName, fields, indexOptions);
		}
	},
	async down(queryInterface) {
		User.load(queryInterface.sequelize);
		await queryInterface.dropTable(User.tableName);
	},
};
