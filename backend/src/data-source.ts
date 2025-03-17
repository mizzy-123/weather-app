import { DataSource } from "typeorm";
import { Place } from "./database/entity/Place";
import { Weather } from "./database/entity/Weather";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "weather-api",
    synchronize: true,
    logging: false,
    entities: [Place, Weather],
    migrations: ["src/migrations/**/*.ts"],
    subscribers: []
});
