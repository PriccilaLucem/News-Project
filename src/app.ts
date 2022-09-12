import "reflect-metadata";
import express from "express";
import { AppDataSource } from "../DataSource/datasource";
import initApp from "./routes";

const app = express();

AppDataSource.initialize();

app.use(express.json());

initApp(app);

export default app;
