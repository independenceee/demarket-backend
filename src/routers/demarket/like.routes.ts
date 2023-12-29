import { Router } from "express";
import likeController from "../../controllers/demarket/Like.controller";

const router = Router();

router.route("/").post(likeController.addLikeNftByAccountId);
router.route("/").delete(likeController.deleteLikeNftByAccountId);

export default router;
