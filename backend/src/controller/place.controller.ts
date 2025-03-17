import { NextFunction, Request, Response } from "express";
import { PlaceService } from "../service/place.service";

export class PlaceController {
    static async showAllPlace(req: Request, res: Response, next: NextFunction) {
        try {
            const place = await PlaceService.showAllPlace();

            res.json({
                code: 200,
                message: "Get all place successfull",
                data: place
            });
        } catch (error) {
            next(error);
        }
    }
}
