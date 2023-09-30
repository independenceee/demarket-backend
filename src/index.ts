import * as dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express, { Express } from "express";
import session from "express-session";

import configs from "./configs";
import router from "./routers/index.routes";
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
    app.use(session(configs.sessionOptions));
    app.use(cookieParser());

    app.use(express.static("public"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    router(app);

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
