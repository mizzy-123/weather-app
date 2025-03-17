import { AppDataSource } from "../../data-source";
import { Place } from "../entity/Place";

export const PlaceSeeder = async () => {
    try {
        const placeRepository = AppDataSource.getRepository(Place);

        const places: Partial<Place>[] = [
            {
                city: "Jakarta",
                country: "Indonesia"
            },
            {
                city: "Denpasar",
                country: "Indonesia"
            },
            {
                city: "Hokkaido",
                country: "Japan"
            },
            {
                city: "Madinah",
                country: "Saudi Arabia"
            },
            {
                city: "Lagos",
                country: "Nigeria"
            },
            {
                city: "Dublin",
                country: "Ireland"
            }
        ];

        await placeRepository.insert(places);

        console.log("Place seeding completed!");
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error in PlaceSeeder:", error.message);
        } else {
            console.error("Error in PlaceSeeder:", error);
        }
    }
};
