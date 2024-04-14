import { Router } from "express";
import contractController from "../../controllers/contract/Assets.controller";
const router = Router();

router.route("/information").post(contractController.getAllAssetsFromContract);

export default router;
