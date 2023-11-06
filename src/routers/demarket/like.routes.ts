import { Router } from "express";
import likeController from "../../controllers/demarket/Like.controller";

const router = Router();

router.route("/").get(likeController.getLikes);
router.route("/").post(likeController.addLike);
router.route("/").delete(likeController.deleteLike);

export default router;
