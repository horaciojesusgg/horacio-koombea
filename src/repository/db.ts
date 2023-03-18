import { DataSource } from "typeorm";
import { Contact } from "../entity/Contact";
import { User } from "../entity/User";
import { ContactFile } from "../entity/ContactFile";
import config from "../config";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: config.dbHost,
    username: config.dbUsername,
    password: config.dbPassword,
    database:  config.dbDatabase,
    port: 5432,
    entities: [User, Contact, ContactFile],
    synchronize: true,
})