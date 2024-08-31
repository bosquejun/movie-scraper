import { getEnv } from "@comeback/utils";
import "dotenv/config";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
	dialect: "postgres",
	define: {
		freezeTableName: true,
	},
	database: getEnv("DB_NAME"),
	username: getEnv("DB_USER"),
	password: getEnv("DB_PASSWORD"),
	host: getEnv("DB_HOST"),
	port: +getEnv("DB_PORT"),
});

export default sequelize;
