import { DataSource } from "typeorm";
import { config } from "dotenv";

config();

export const AppDataSource = new DataSource({
  type: "postgres",
  port: 5432,
  host: process.env.HOST,
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: ["./src/entities/*.ts"],
  migrations: ["./src/migrations/*.ts"],
  logging: true,
  synchronize: true,
});
