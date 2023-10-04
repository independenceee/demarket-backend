import { Router } from "express";
import collectionController from "../../controllers/demarket/Collection.controller";
import UploadFile from "../../middlewares/Upload";

const router = Router();

router.route("/").get(collectionController.getAllCollections);
router.route("/:id").get(collectionController.getCollectionById);
router.route("/").post(
    UploadFile.fields([
        { name: "avatar", maxCount: 1 },
        { name: "cover", maxCount: 1 },
    ]),
    collectionController.createCollection,
);
router.route("/:id").patch(
    UploadFile.fields([
        { name: "avatar", maxCount: 1 },
        { name: "cover", maxCount: 1 },
    ]),
    collectionController.updateCollectionById,
);

router.route("/:id").delete(collectionController.deleteCollectionById);

export default router;
