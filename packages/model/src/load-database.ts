import { existsSync, readdirSync } from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import "./config";
import sequelize from "./config";
import { BaseEntity } from "./entity";

type LoadDatabase = {
	entitiesPath: string;
	sequelize?: Sequelize;
};

export async function loadDatabase({
	entitiesPath,
	sequelize: _sequelize = sequelize,
}: LoadDatabase) {
	const resolvedPath = await existsSync(entitiesPath);

	if (!resolvedPath) {
		throw new Error("Entities path not found.");
	}

	const entities = await readdirSync(entitiesPath);

	await Promise.all(
		entities.map(async (entityFile) => {
			const entityPath = path.join(entitiesPath, entityFile);
			if (entityPath.endsWith(".ts") || entityPath.endsWith(".js")) {
				const modelModule = await import(entityPath);

				// Initialize the model if it has an init method
				const entity = modelModule.default as typeof BaseEntity;
				entity.load(_sequelize);
			}
		})
	);

	for (const modelName in _sequelize.models) {
		(_sequelize.models[modelName] as any).associate();
	}
}
