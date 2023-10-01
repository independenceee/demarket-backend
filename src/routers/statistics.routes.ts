import { Router } from "express";
import statisticsController from "../controllers/Statistics.controller";

const router = Router();

router.route("/").get(statisticsController.getAllStatistics);
router.route("/").post(statisticsController.createStatistics);
router.route("/:id").get(statisticsController.getStatisticsById);
router.route("/:id").patch(statisticsController.updateStatisticsById);
router.route("/:id").delete(statisticsController.deleteStatisticsById);

export default router;
