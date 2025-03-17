import express from "express";
import cors from "cors";
import { appRouter } from "../route";

export const web = express();

web.use("/public", express.static("./public"));

web.use(
    cors({
        origin: true,
        credentials: true,
        preflightContinue: false,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
    })
);

web.options("*", cors());
web.use(express.json());
web.use(express.urlencoded({ extended: true }));
web.use(appRouter);
