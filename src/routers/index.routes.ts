import { Express } from "express";

import accountRouter from "../routers/account.routes";

const router = function (app: Express) {
    app.use("/api/account", accountRouter);
};

export default router;
