require("ts-node/register");
const { default: Movie } = require("../../src/model/entities/movie");

module.exports = {
	async up(queryInterface) {
		Movie.load(queryInterface.sequelize);

		const { averageRating, ...premitiveAttr } = Movie.getAttributes();
		await queryInterface.createTable(Movie.tableName, premitiveAttr);

		for (const { fields, ...indexOptions } of Movie.options.indexes) {
			await queryInterface.addIndex(
				Movie.tableName,
				fields,
				indexOptions
			);
		}
	},
	async down(queryInterface) {
		Movie.load(queryInterface.sequelize);
		await queryInterface.dropTable(Movie.tableName);
	},
};
