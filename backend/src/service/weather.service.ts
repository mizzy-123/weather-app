import { Request } from "express";
import { AppDataSource } from "../data-source";
import { Weather } from "../database/entity/Weather";
import { GetWeather } from "../model/weather.model";

export class WeatherService {
    static async showAllWeather(req: Request): Promise<GetWeather> {
        const query = AppDataSource.getRepository(Weather)
            .createQueryBuilder("weather")
            .leftJoinAndSelect("weather.place", "place");

        // Filter berdasarkan place_id jika tersedia
        if (req.query.place_id) {
            query.where("weather.place_id = :place_id", {
                place_id: req.query.place_id
            });
        }

        // Filter berdasarkan satu tanggal (opsional)
        if (req.query.date) {
            query.andWhere("DATE(weather.datetime) = :date", {
                date: req.query.date
            });
        }

        // Ambil data dari database
        const weatherData = await query.getMany();

        // Struktur data untuk chart
        const formattedData: GetWeather = {
            temperature: weatherData.map((weather) => ({
                datetime: weather.datetime,
                value: weather.temperature
            })),
            temperature_feels: weatherData.map((weather) => ({
                datetime: weather.datetime,
                value: weather.temperature_feels
            })),
            precipitation: weatherData.map((weather) => ({
                datetime: weather.datetime,
                value: weather.precipitation
            })),
            humidity: weatherData.map((weather) => ({
                datetime: weather.datetime,
                value: weather.humidity
            })),
            wind_speed: weatherData.map((weather) => ({
                datetime: weather.datetime,
                value: weather.wind_speed
            }))
        };

        return formattedData;
    }
}
