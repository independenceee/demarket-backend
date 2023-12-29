import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequest, InternalServerError } from "../../errors";
import statisticService from "../../services/demarket/Statistic.service";

class StatisticsController {
    async getAccounts(request: Request, response: Response) {
        try {
            const totalAccounts = await statisticService.totalAccounts();
            response.status(StatusCodes.OK).json({ totalAccounts });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }

    async getProducts(request: Request, response: Response) {
        try {
            const { contractAddress } = request.query;
            if (!contractAddress) return response.status(StatusCodes.BAD_REQUEST).json(new BadRequest("Address smart contract has been require."));
            const totalProducts = await statisticService.totalProducts(String(contractAddress));
            response.status(StatusCodes.OK).json({ totalProducts });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }

    async getTransactions(request: Request, response: Response) {
        try {
            const { contractAddress } = request.query;
            if (!contractAddress) return response.status(StatusCodes.BAD_REQUEST).json(new BadRequest("Address smart contract has been required."));
            const totalTransactions = await statisticService.totalTransactions(String(contractAddress));
            response.status(StatusCodes.OK).json({ totalTransactions });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }
    async getTrendings(request: Request, response: Response) {
        try {
            const totalTrendings = await statisticService.totalTrendings();
            response.status(StatusCodes.OK).json({ totalTrendings });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }
}

export default new StatisticsController();
