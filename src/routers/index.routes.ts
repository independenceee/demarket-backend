import { Express } from "express";

import accountRouter from "./demarket/account.routes";
import cartRouter from "./demarket/cart.routes";
import guideRouter from "./demarket/guide.routes";
import collectionRouter from "./demarket/collection.routes";
import blogRouter from "./demarket/blog.routes";
import categoryRouter from "./demarket/category.routes";
import nftRouter from "./demarket/nft.routes";
import founderRouter from "./demarket/founder.routes";
import statisticsRouter from "./demarket/statistics.routes";
import searchRouter from "./demarket/search.routes";

import blockfrostAssetsRouter from "./blockfrost/assets.routes";
import blockfrostTransactionRouter from "./blockfrost/transaction.routes";
import koiosAssetsRouter from "./koios/assets.routes";

const router = function (app: Express) {
    app.use("/api/v1/account", accountRouter);
    app.use("/api/v1/cart", cartRouter);
    app.use("/api/v1/guide", guideRouter);
    app.use("/api/v1/collection", collectionRouter);
    app.use("/api/v1/category", categoryRouter);
    app.use("/api/v1/nft", nftRouter);
    app.use("/api/v1/blog", blogRouter);
    app.use("/api/v1/founder", founderRouter);
    app.use("/api/v1/statistics", statisticsRouter);
    app.use("/api/v1/search", searchRouter);

    app.use("/api/v1/blockfrost/transaction", blockfrostTransactionRouter);
    app.use("/api/v1/blockfrost/assets", blockfrostAssetsRouter);
    app.use("/api/v1/koios/assets", koiosAssetsRouter);
};

export default router;
