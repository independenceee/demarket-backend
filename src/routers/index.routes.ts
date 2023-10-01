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
    app.use("/api/account", accountRouter);

    //
    app.use("/api/cart", cartRouter);

    // => success
    app.use("/api/guide", guideRouter);

    //
    app.use("/api/collection", collectionRouter);

    //
    app.use("/api/category", categoryRouter);

    //
    app.use("/api/nft", nftRouter);

    //
    app.use("/api/blog", blogRouter);

    //
    app.use("/api/founder", founderRouter);

    //
    app.use("/api/statistics", statisticsRouter);

    //

    app.use("/api/search", searchRouter);
};

export default router;
