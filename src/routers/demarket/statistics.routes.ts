import { Router } from "express";
import statisticsController from "../../controllers/demarket/Statistics.controller";

const router = Router();

router.route("/account").get(statisticsController.getAccounts);
router.route("/product").get(statisticsController.getProducts);
router.route("/transaction").get(statisticsController.getTransactions);
router.route("/trending").get(statisticsController.getTrendings);

export default router;
