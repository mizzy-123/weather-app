import { Router } from "express";
import { PlaceController } from "../controller/place.controller";
import { WeatherController } from "../controller/weather.controller";

export const publicRouter = Router();

publicRouter.get("/place", PlaceController.showAllPlace);
publicRouter.get("/weather", WeatherController.showAllWeather);
