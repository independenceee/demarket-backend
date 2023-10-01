import { Express } from "express";

import accountRouter from "../routers/account.routes";
import cartRouter from "../routers/cart.routes";
import guideRouter from "../routers/guide.routes";
import collectionRouter from "../routers/collection.routes";
import blogRouter from "../routers/blog.routes";
import categoryRouter from "../routers/category.routes";
import nftRouter from "../routers/nft.routes";
import founderRouter from "../routers/founder.routes";
import statisticsRouter from "../routers/statistics.routes";
import searchRouter from "../routers/search.routes";

const router = function (app: Express) {
    //
    app.use("/api/v1/account", accountRouter);

    //
    app.use("/api/v1/cart", cartRouter);
    app.use("/api/v1/guide", guideRouter);

    //
    app.use("/api/v1/collection", collectionRouter);

    //
    app.use("/api/v1/category", categoryRouter);

    //
    app.use("/api/v1/nft", nftRouter);

    //
    app.use("/api/v1/blog", blogRouter);

    //
    app.use("/api/v1/founder", founderRouter);

    //
    app.use("/api/v1/statistics", statisticsRouter);

    //

    app.use("/api/v1/search", searchRouter);
};

export default router;
