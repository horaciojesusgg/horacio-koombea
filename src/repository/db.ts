import { DataSource } from "typeorm";
import { Contact } from "../entity/Contact";
import { User } from "../entity/User";
import { ContactFile } from "../entity/ContactFile";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'example',
    port: 5432,
    entities: [User, Contact, ContactFile],
    database: 'horacio-test-koombea-db',
    synchronize: true,
})