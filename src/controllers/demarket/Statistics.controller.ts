import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError, InternalServerError, NotFound } from "../../errors";
import statisticService from "../../services/demarket/Statistic.service";
import prisma from "../../models";

class StatisticsController {
    constructor() {}

    async getAllStatistics(request: Request, response: Response) {
        try {
            const statistics = await prisma.statistics.findMany({});

            response.status(StatusCodes.OK).json(statistics);
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new InternalServerError(error));
        }
    }

    async getStatisticsById(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const statistic = await statisticService.findStatisticById(id);

            if (!statistic) {
                return response
                    .status(StatusCodes.NOT_FOUND)
                    .json(new NotFound("Statistic is not found."));
            }

            response.status(StatusCodes.OK).json(statistic);
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new InternalServerError(error));
        }
    }

    async createStatistics(request: Request, response: Response) {
        try {
            const statistics = await prisma.statistics.findMany({});

            if (statistics) {
                return response
                    .status(StatusCodes.FORBIDDEN)
                    .json(new ApiError("Statistics has already exits."));
            }
            await prisma.statistics.create({
                data: {
                    totalAuthor: 0,
                    totalCollection: 0,
                    totalTrending: 0,
                    totalProduct: 0,
                },
            });

            response.status(StatusCodes.OK).json({
                message: "Statistic create successfully.",
            });
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new InternalServerError(error));
        }
    }

    async updateStatisticsById(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { author, collection, trending, product } = request.query;

            const existStatistics = await statisticService.findStatisticById(id);
            if (!existStatistics) {
                return response
                    .status(StatusCodes.NOT_FOUND)
                    .json(new NotFound("Statistics is not found."));
            }

            await prisma.statistics.updateMany({
                data: {
                    totalAuthor: author
                        ? existStatistics.totalAuthor + 1
                        : existStatistics.totalAuthor,
                    totalCollection: collection
                        ? existStatistics.totalAuthor + 1
                        : existStatistics.totalCollection,
                    totalProduct: product
                        ? existStatistics.totalProduct + 1
                        : existStatistics.totalProduct,

                    totalTrending: trending
                        ? existStatistics.totalTrending + 1
                        : existStatistics.totalTrending,
                },
            });

            response.status(StatusCodes.OK).json({
                message: "Update statistics successfully.",
            });
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new InternalServerError(error));
        }
    }

    async deleteStatisticsById(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const existStatistics = await statisticService.findStatisticById(id);
            if (!existStatistics) {
                return response
                    .status(StatusCodes.NOT_FOUND)
                    .json(new NotFound("Statistics is not found."));
            }

            await prisma.statistics.delete({
                where: {
                    id: id,
                },
            });

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
