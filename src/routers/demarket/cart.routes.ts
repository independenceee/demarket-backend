import { Router } from "express";
import cartController from "../../controllers/demarket/Cart.controller";

const router = Router();

router.route("/add_to_cart").post(cartController.addNftToCart);
router.route("/remove_from_cart").post(cartController.remoteNftFromCart);

export default router;
