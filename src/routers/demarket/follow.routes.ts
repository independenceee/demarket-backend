import { Router } from "express";
import followController from "../../controllers/demarket/Follow.controller";

const router = Router();

// router.route("/followed").get(followController.getFolloweds);
// router.route("/following").get(followController.getFollowings);
router.route("/").post(followController.createFollowAccount);
router.route("/").delete(followController.deleteFollowAccount);

export default router;
