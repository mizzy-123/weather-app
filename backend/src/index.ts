import "dotenv/config";
import { AppDataSource } from "./data-source";
import { web } from "./application/web";
import { logger } from "./application/logging";

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });

const port: number =
    process.env.PORT != null ? parseInt(process.env.PORT) : 3000;

web.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
    logger.info(`Listening on http://localhost:${port}`);
});
