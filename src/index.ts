import * as dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import express, { Express, Request, Response } from "express";
import configs from "./configs";

import LogHandler from "./middlewares/LogHandler";
import notFound from "./middlewares/NotFound";
import errorHandler from "./middlewares/ErrorHandler";

const app: Express = express();
dotenv.config();

const start = function () {
    if (!process.env.PORT) {
        process.exit(1);
    }

    const PORT: number = parseInt(process.env.PORT as string, 10);
    app.use(LogHandler);
    app.use(cors(configs.corsOptions));
    app.use(express.static("public"));
    app.use(express.json());
    app.use(bodyParser.json());

    // app.use();
    app.use(errorHandler);
    app.use(notFound);
    app.listen(PORT, function () {
        console.log(`http://localhost:${PORT}`);
    });
};

(function () {
    start();
})();

export default app;
