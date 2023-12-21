import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { InternalServerError, NotFound } from "../../errors";
import statisticService from "../../services/demarket/Statistic.service";

class StatisticsController {
    async getStatistics(request: Request, response: Response) {
        try {
            const statistics = await statisticService.findStatistics();
            response.status(StatusCodes.OK).json(statistics);
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }
}

export default new StatisticsController();
