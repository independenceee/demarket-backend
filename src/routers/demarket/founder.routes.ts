import { Router } from "express";
import founderController from "../../controllers/demarket/Founder.controller";
import UploadFile from "../../middlewares/Upload";

const router = Router();

router.route("/").get(founderController.getAllFounders);
router.route("/:id").get(founderController.getFounderById);
router.route("/").post(UploadFile.single("avatar"), founderController.createFounder);
router.route("/:id").patch(UploadFile.single("avatar"), founderController.updateFounderById);
router.route("/:id").delete(founderController.deleteFounderById);

export default router;
