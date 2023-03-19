import { DataSource } from "typeorm";
import config from "../config";

export const AppDataSource = new DataSource({
    migrationsTableName: 'migrations',
    type: 'postgres',
    host: config.dbHost,
    username: config.dbUsername,
    password: config.dbPassword,
    database:  config.dbDatabase,
    port: 5432,
    migrations: ['src/migrations/**/*{.js,.ts}'],
    entities: ["src/entity/**/*{.js,.ts}"],
})