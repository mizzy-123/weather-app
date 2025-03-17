import cron from "node-cron";
import { AppDataSource } from "../data-source";
import "dotenv/config";
import { Place } from "../database/entity/Place";
import { Weather } from "../database/entity/Weather";

const API_KEY = process.env.API_KEY_WEATHER || "";

/**
 * Fetch weather data from WeatherAPI and store it in the database using transactions.
 */
const fetchWeatherData = async () => {
    const placeRepository = AppDataSource.getRepository(Place);
    const places = await placeRepository.find();

    if (places.length === 0) {
        console.log("No places found to fetch weather data.");
        return;
    }

    // Mulai transaction
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const weatherDataPromises = places.map(async (place) => {
            const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${place.city}&aqi=no`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(
                    `Failed to fetch weather for ${place.city}. Status: ${response.status}`
                );
            }

            const data = await response.json();

            return {
                datetime: new Date(),
                temperature: data.current.temp_c,
                temperature_feels: data.current.feelslike_c,
                precipitation: data.current.precip_mm,
                humidity: data.current.humidity,
                wind_speed: data.current.wind_kph,
                place
            };
        });

        // Tunggu semua request selesai secara paralel
        const weatherData = await Promise.all(weatherDataPromises);

        // Simpan semua data ke dalam database menggunakan transaction
        await queryRunner.manager.insert(Weather, weatherData);

        await queryRunner.commitTransaction();
        console.log("Weather data successfully inserted:", weatherData);
    } catch (error) {
        await queryRunner.rollbackTransaction();
        console.error("Error fetching or inserting weather data:", error);
    } finally {
        await queryRunner.release();
    }
};

/**
 * Start a cron job to fetch weather data every minute.
 */
const startCronJob = () => {
    cron.schedule("*/10 * * * *", async () => {
        console.log("Starting to fetch weather data...");
        await fetchWeatherData();
    });

    console.log("Cron job scheduler started.");
};

/**
 * Initialize the database and start the cron job.
 */
const initializeApp = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Data Source has been initialized!");
        startCronJob();
    } catch (error) {
        console.error("Error initializing Data Source:", error);
    }
};

// Jalankan inisialisasi aplikasi
initializeApp();
