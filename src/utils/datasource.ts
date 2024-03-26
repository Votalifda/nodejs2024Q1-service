import { DataSource } from 'typeorm';
import { join } from 'path';

export const connectionSource = new DataSource({
    type: 'postgres',
    host: 'postgres',
    port: +process.env.POSTGRES_PORT || 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DB || 'postgres ',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    logging: false,
    synchronize: false,
    migrationsTableName: 'typeorm_migrations',
    migrationsRun: false,
    migrations: [join(__dirname, '/../', 'migrations/**/*{.ts,.js}')],
});