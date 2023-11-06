import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequest, InternalServerError } from "../../errors";
import prisma from "../../models";

class LikeController {
    async getLikes(request: Request, response: Response) {
        try {
            const { nftId } = request.query;

            if (!nftId) {
                return response
                    .status(StatusCodes.BAD_REQUEST)
                    .json(new BadRequest("nftId has been required"));
            }
            const likes = await prisma.likes.findMany({
                where: {
                    nftId: String(nftId),
                },
                select: {
                    accountId: true,
                },
            });

            response.status(StatusCodes.OK).json(likes);
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        } finally {
            await prisma.$disconnect();
        }
    }

    async addLike(request: Request, response: Response) {
        try {
            const { accountId, nftId } = request.body;
            await prisma.likes.create({
                data: {
                    accountId: accountId,
                    nftId: nftId,
                },
            });

            response.status(StatusCodes.OK).json({
                message: "like nft successfully",
            });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        } finally {
            await prisma.$disconnect();
        }
    }

    async deleteLike(request: Request, response: Response) {
        try {
            const { accountId, nftId } = request.body;
            await prisma.likes.delete({
                where: {
                    accountId_nftId: {
                        accountId: accountId,
                        nftId: nftId,
                    },
                },
            });

            response.status(StatusCodes.OK).json({
                message: "unlike nft successfully",
            });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        } finally {
            await prisma.$disconnect();
        }
    }
}

export default new LikeController();
