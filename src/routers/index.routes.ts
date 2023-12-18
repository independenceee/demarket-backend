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
import followRouter from "./demarket/follow.routes";
import likeRouter from "./demarket/like.routes";
import mailRouter from "./demarket/mail.routes";

import blockfrostAssetsRouter from "./blockfrost/assets.routes";
import blockfrostTransactionRouter from "./blockfrost/transaction.routes";
import koiosAssetsRouter from "./koios/assets.routes";
import stakekeyRouter from "./emurgo/stakekey.routes";

const router = function (app: Express) {
    app.use("/api/v1/follow", followRouter);
    app.use("/api/v1/mail", mailRouter);
    app.use("/api/v1/account", accountRouter);
    app.use("/api/v1/cart", cartRouter);
    app.use("/api/v1/guide", guideRouter);
    // app.use("/api/v1/collection", collectionRouter);
    app.use("/api/v1/category", categoryRouter);
    app.use("/api/v1/nft", nftRouter);
    app.use("/api/v1/blog", blogRouter);
    app.use("/api/v1/founders", founderRouter);
    app.use("/api/v1/statistics", statisticsRouter);
    app.use("/api/v1/search", searchRouter);

    app.use("/api/v1/blockfrost/transaction", blockfrostTransactionRouter);
    app.use("/api/v1/blockfrost/assets", blockfrostAssetsRouter);

    app.use("/api/v1/koios/assets", koiosAssetsRouter);

    app.use("/api/v1/emurgo/stakekey", stakekeyRouter);
};

export default router;
