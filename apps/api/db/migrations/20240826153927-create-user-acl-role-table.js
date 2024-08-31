require("ts-node/register");
const {
	default: UserAclRole,
} = require("../../src/model/entities/user-acl-role");

module.exports = {
	async up(queryInterface) {
		UserAclRole.load(queryInterface.sequelize);
		await queryInterface.createTable(
			UserAclRole.tableName,
			UserAclRole.getAttributes()
		);

		for (const { fields, ...indexOptions } of UserAclRole.options.indexes) {
			await queryInterface.addIndex(
				UserAclRole.tableName,
				fields,
				indexOptions
			);
		}
	},
	async down(queryInterface) {
		UserAclRole.load(queryInterface.sequelize);
		await queryInterface.dropTable(UserAclRole.tableName);
	},
};
