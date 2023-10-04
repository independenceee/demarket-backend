import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError, InternalServerError, NotFound } from "../../errors";
import statisticService from "../../services/demarket/Statistic.service";
import prisma from "../../models";

class StatisticsController {
    constructor() {}

    async getStatistics(request: Request, response: Response) {
        try {
            const statistic = await statisticService.findManyStatistics();

            if (!statistic) {
                return response
                    .status(StatusCodes.NOT_FOUND)
                    .json(new NotFound("Statistic is not found."));
            }
            await statisticService.updateStatistics();
            response.status(StatusCodes.OK).json(statistic[0]);
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new InternalServerError(error));
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
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new InternalServerError(error));
        }
    }
}

export default new StatisticsController();
