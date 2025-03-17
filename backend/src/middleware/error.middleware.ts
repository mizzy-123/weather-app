import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../error/response.error";
import { logger } from "../application/logging";

export const errorMiddleware = async (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const combinedErrors: Record<string, string[]> = {};
    let firstMessage: string | null = null;

    if (error instanceof ZodError) {
        error.errors.forEach((err) => {
            const field = err.path[0].toString();
            if (!combinedErrors[field]) {
                combinedErrors[field] = [];
            }
            combinedErrors[field].push(err.message);

            if (!firstMessage) {
                firstMessage = `${field} ${err.message}`;
            }
        });
    }

    if (Object.keys(combinedErrors).length > 0) {
        res.status(400).json({
            code: 400,
            message: firstMessage || "Validation failed",
            error: combinedErrors
        });

        return;
    }

    if (error instanceof ResponseError) {
        res.status(error.status).json({
            code: error.status,
            message: error.message
        });

        logger.error(error.message);
        return;
    } else {
        res.status(500).json({
            code: 500,
            message: "Something wrong"
        });

        logger.error(error.message);
        return;
    }

    next();
};
