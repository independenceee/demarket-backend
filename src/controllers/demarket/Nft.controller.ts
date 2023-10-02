import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError, InternalServerError, NotFound } from "../../errors";

import statisticsController from "./Statistics.controller";
import nftService from "../../services/demarket/Nft.service";
import prisma from "../../models";

class NftController {
    async getAllNfts(request: Request, response: Response) {
        try {
            const { page } = request.query;

            const nfts = await nftService.findAllNfts(Number(page));

            response.status(StatusCodes.OK).json(nfts);
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new InternalServerError(error));
        }
    }

    async getNftById(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const nft = await nftService.findNftById(id);

            if (nft) {
                return response
                    .status(StatusCodes.NOT_FOUND)
                    .json(new NotFound("Nft is not found."));
            }

            response.status(StatusCodes.OK).json(nft);
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new InternalServerError(error));
        }
    }

    async createNft(request: Request, response: Response) {
        try {
            const { policyId, assetName, status } = request.body;
            const { collectionId } = request.query;
            const existNft = await nftService.findNftByPolicyIdAndAssetName(
                policyId,
                assetName,
            );

            if (existNft) {
                return response
                    .status(StatusCodes.FORBIDDEN)
                    .json(new ApiError("Nft already exists."));
            }

            await prisma.nFT.create({
                data: {
                    status: status ? status : "",

                    policyId: policyId,
                    assetName: assetName,
                    collectionId: collectionId ? String(collectionId) : "no_collection",
                },
            });

            await statisticsController.updateStatistics(request, response);

            response.status(StatusCodes.OK).json({
                mesage: "Nft add successfully.",
            });
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new InternalServerError(error));
        }
    }

    async updateNftById(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { status, collectionId, transaction } = request.body;

            const existNft = await nftService.findNftById(id);

            if (!existNft) {
                return response
                    .status(StatusCodes.NOT_FOUND)
                    .json(new NotFound("Nft is not found."));
            }

            await prisma.nFT.update({
                where: {
                    id: id,
                },
                data: {
                    status: status ? status : existNft.status,
                    collectionId: collectionId ? collectionId : existNft.collectionId,
                    totalTransaction: transaction
                        ? Number(existNft.totalTransaction) + 1
                        : existNft.totalTransaction,
                    countOfTransaction: transaction
                        ? Number(existNft.countOfTransaction) + 1
                        : existNft.countOfTransaction,
                },
            });

            response.status(StatusCodes.OK).json({
                message: "Update nft successfully.",
            });
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new InternalServerError(error));
        }
    }

    async deleteNftById(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const existNft = await nftService.findNftById(id);

            if (!existNft) {
                return response
                    .status(StatusCodes.NOT_FOUND)
                    .json(new NotFound("Nft is not found."));
            }

            await prisma.nFT.delete({ where: { id: id } });

            response.status(StatusCodes.OK).json({
                message: "delete nft successfully.",
            });
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new InternalServerError(error));
        }
    }
}

export default new NftController();
