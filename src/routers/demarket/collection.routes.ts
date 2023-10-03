import { Router } from "express";
import collectionController from "../../controllers/demarket/Collection.controller";

const router = Router();

router.route("/").post(collectionController.createCollection);

export default router;
