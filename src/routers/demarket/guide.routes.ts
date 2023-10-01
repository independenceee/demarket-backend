import { Router } from "express";

import guideController from "../../controllers/demarket/Guide.controller";

const router = Router();

router.route("/").get(guideController.getAllGuides);
router.route("/").post(guideController.createGuide);
router.route("/:id").get(guideController.getGuideId);
router.route("/:id").patch(guideController.updateGuide);
router.route("/:id").delete(guideController.deleteGuide);

export default router;
