import { Router } from "express";
import { publicRouter } from "./public-api";

export const appRouter = Router();

appRouter.use("/api", publicRouter);
