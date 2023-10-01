import { Router } from "express";

import founderController from "../controllers/Founder.controller";

const router = Router();

router.route("/").get(founderController.getAllFounders);
router.route("/:id").get(founderController.getFounderById);
router.route("/").post(founderController.createFounder);
router.route("/:id").patch(founderController.updateFounderById);
router.route("/:id").delete(founderController.deleteFounderById);

export default router;
