import 'reflect-metadata';
import Server from "./app"
import { AppDataSource } from './repository/db';

const main = async () => {
    try {
        const app = new Server();
        await AppDataSource.initialize();
        app.listen();
    } catch(error) {
        console.error(error)
    }

}

main();