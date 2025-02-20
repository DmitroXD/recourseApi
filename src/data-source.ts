import {DataSource} from "typeorm";
import * as Models from "./entity";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "test-db",
    synchronize: true,
    logging: true,
    entities: Models,
    subscribers: [],
    migrations: [],
})