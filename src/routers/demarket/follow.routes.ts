import { Router } from "express";
import followController from "../../controllers/demarket/Follow.controller";

const router = Router();

router.route("/").get(followController.getFollowes);
router.route("/").post(followController.addFollow);
router.route("/").delete(followController.deleteFollow);

export default router;
