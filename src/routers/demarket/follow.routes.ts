import { Router } from "express";
import followController from "../../controllers/demarket/Follow.controller";

const router = Router();

router.route("/").post(followController.createFollowAccount);
router.route("/").delete(followController.deleteFollowAccount);

export default router;
