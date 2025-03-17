import { AppDataSource } from "../data-source";
import { Place } from "../database/entity/Place";

export class PlaceService {
    static async showAllPlace(): Promise<Place[]> {
        const placeService = AppDataSource.getRepository(Place);

        const result = await placeService.find();

        return result;
    }
}
