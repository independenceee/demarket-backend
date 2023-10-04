import { Router } from "express";
import categoryController from "../../controllers/demarket/Category.controller";

const router = Router();

router.route("/").get(categoryController.getAllCategores);
router.route("/").post(categoryController.createCategory);
router.route("/:id").get(categoryController.getCategory);
router.route("/:id").patch(categoryController.updateCategory);
router.route("/:id").delete(categoryController.deleteCategory);

export default router;
