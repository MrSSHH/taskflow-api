import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'benji',
  password: 'pass123',
  database: 'mydb',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'], // compiled migrations
  synchronize: false, // never true with migrations
});
