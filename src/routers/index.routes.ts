import { Express } from "express";

const router = function (app: Express) {
    app.use("/api/account");
};

export default router;
