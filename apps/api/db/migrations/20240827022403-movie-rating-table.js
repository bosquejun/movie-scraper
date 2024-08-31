require("ts-node/register");
const {
	default: MovieRating,
} = require("../../src/model/entities/movie-rating");

module.exports = {
	async up(queryInterface) {
		MovieRating.load(queryInterface.sequelize);
		await queryInterface.createTable(
			MovieRating.tableName,
			MovieRating.getAttributes()
		);

		for (const { fields, ...indexOptions } of MovieRating.options.indexes) {
			await queryInterface.addIndex(
				MovieRating.tableName,
				fields,
				indexOptions
			);
		}
	},
	async down(queryInterface) {
		MovieRating.load(queryInterface.sequelize);
		await queryInterface.dropTable(MovieRating.tableName);
	},
};
