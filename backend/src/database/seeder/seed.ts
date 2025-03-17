import { exit } from "process";
import { AppDataSource } from "../../data-source";
import { PlaceSeeder } from "./place.seeder";

const Seed = async () => {
    await AppDataSource.initialize();
    await PlaceSeeder();
    exit();
};

Seed();
