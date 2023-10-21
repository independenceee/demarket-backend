import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError, InternalServerError, NotFound } from "../../errors";
import statisticService from "../../services/demarket/Statistic.service";
import prisma from "../../models";

class StatisticsController {
    constructor() {}

    async getStatistics(request: Request, response: Response) {
        try {
            const statistics = await statisticService.findManyStatistics();

            if (statistics?.length === 0 || !statistics) {
                const statistic = await statisticService.createStatistic();
                return response.status(StatusCodes.OK).json(statistic);
            }

            await statisticService.updateStatistics();
            response.status(StatusCodes.OK).json(statistics[0]);
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }

    async deleteStatistics(request: Request, response: Response) {
        try {
            const existStatistics = await statisticService.findManyStatistics();
            if (!existStatistics) {
                return response
                    .status(StatusCodes.NOT_FOUND)
                    .json(new NotFound("Statistics is not found."));
            }

            await prisma.statistics.deleteMany();

            response.status(StatusCodes.OK).json({
                message: "Delete statistics successfully.",
            });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }
}

export default new StatisticsController();
