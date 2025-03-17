import { NextFunction, Request, Response } from "express";
import { WeatherService } from "../service/weather.service";

export class WeatherController {
    static async showAllWeather(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const weather = await WeatherService.showAllWeather(req);

            res.status(200).json({
                code: 200,
                message: "Get data weather successfull",
                data: weather
            });
        } catch (error) {
            next(error);
        }
    }
}
