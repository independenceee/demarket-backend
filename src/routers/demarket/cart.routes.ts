import { Router } from "express";
import cartController from "../../controllers/demarket/Cart.controller";

const router = Router();

router.route("/").post(cartController.addNftToCart);
router.route("/").delete(cartController.remoteNftFromCart);

export default router;
