import * as dotenv from 'dotenv';
dotenv.config()

const config = {
    dbHost: process.env.DB_HOST || 'localhost',
    dbUsername: process.env.DB_USERNAME || 'postgres',
    dbPassword: process.env.DB_PASSWORD || 'example',
    dbDatabase:  process.env.DB_NAME || 'horacio-test-koombea-db',
    jwtSecret: process.env.JWT_SECRET || 'secret_key_horacio'
}

export default config;
