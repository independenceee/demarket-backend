import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { InternalServerError } from "../../errors";
class NftController {
    async getAllNfts(request: Request, response: Response) {
        try {
            const {page} = request.query;
            
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new InternalServerError(error));
        }
    }

    async getNftById(request: Request, response: Response) {
        try {
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new InternalServerError(error));
        }
    }

    async createNft(request: Request, response: Response) {
        try {
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new InternalServerError(error));
        }
    }

    async updateNftById(request: Request, response: Response) {
        try {
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new InternalServerError(error));
        }
    }

    async deleteNftById(request: Request, response: Response) {
        try {
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new InternalServerError(error));
        }
    }
}

export default new NftController();
