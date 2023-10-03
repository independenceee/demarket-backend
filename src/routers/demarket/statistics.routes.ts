import { Router } from "express";
import statisticsController from "../../controllers/demarket/Statistics.controller";

const router = Router();

router.route("/").get(statisticsController.getStatistics);
router.route("/").delete(statisticsController.deleteStatistics);

export default router;
