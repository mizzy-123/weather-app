export type GetWeather = {
    temperature: { datetime: Date; value: number }[];
    temperature_feels: { datetime: Date; value: number }[];
    precipitation: { datetime: Date; value: number }[];
    humidity: { datetime: Date; value: number }[];
    wind_speed: { datetime: Date; value: number }[];
};
