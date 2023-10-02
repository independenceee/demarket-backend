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

            response.status(StatusCodes.OK).json(statistic);
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new InternalServerError(error));
        }
    }

    async createStatistics(request: Request, response: Response) {
        try {
            const statistics = await statisticService.findManyStatistics();

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

    async updateStatistics(request: Request, response: Response) {
        try {
            const { address, collection, trending, policyId, assetName } = request.body;

            const existStatistics = await statisticService.findManyStatistics();
            if (!existStatistics) {
                return response
                    .status(StatusCodes.NOT_FOUND)
                    .json(new NotFound("Statistics is not found."));
            }

            await prisma.statistics.updateMany({
                data: {
                    totalAuthor: address
                        ? existStatistics[0].totalAuthor + 1
                        : existStatistics[0].totalAuthor,
                    totalCollection: collection
                        ? existStatistics[0].totalAuthor + 1
                        : existStatistics[0].totalCollection,
                    totalProduct:
                        policyId && assetName
                            ? existStatistics[0].totalProduct + 1
                            : existStatistics[0].totalProduct,

                    totalTrending: trending
                        ? existStatistics[0].totalTrending + 1
                        : existStatistics[0].totalTrending,
                },
            });
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
