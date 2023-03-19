import { DataSource } from "typeorm";
import { Contact } from "../entity/Contact";
import { User } from "../entity/User";
import { ContactFile } from "../entity/ContactFile";
import config from "../config";

export const AppDataSource = new DataSource({
    migrationsTableName: 'migrations',
    type: 'postgres',
    host: config.dbHost,
    username: config.dbUsername,
    password: config.dbPassword,
    database:  config.dbDatabase,
    port: 5432,
    migrations: ['../migrations/**/*{.ts,.js}'],
    entities: [User, Contact, ContactFile],
    synchronize: false,
})