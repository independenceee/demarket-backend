import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequest, InternalServerError, NotFound } from "../../errors";
import prisma from "../../models";

class FoLLowController {
    async getFollowes(request: Request, response: Response) {
        try {
            const { followingId } = request.query;
            if (!followingId) {
                response
                    .status(StatusCodes.NOT_FOUND)
                    .json(new NotFound("followingId has been required."));
            }
            const followers = await prisma.follows.findMany({
                where: {
                    followingId: String(followingId),
                },
                select: {
                    followerId: true,
                },
            });

            response.status(StatusCodes.OK).json(followers);
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        } finally {
            await prisma.$disconnect();
        }
    }

    async addFollow(request: Request, response: Response) {
        try {
            const { followingId, followerId } = request.body;

            const checkFollow = await prisma.follows.findFirst({
                where: {
                    followerId: followerId,
                    followingId: followingId,
                },
            });

            if (checkFollow) {
                return response
                    .status(StatusCodes.BAD_GATEWAY)
                    .json(new BadRequest("followed account."));
            }
            await prisma.follows.create({
                data: {
                    followerId: followerId,
                    followingId: followingId,
                },
            });

            response.status(StatusCodes.OK).json({
                message: "follow",
            });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }

    async deleteFollow(request: Request, response: Response) {
        try {
            const { followerId, followingId } = request.body;
            const checkFollow = await prisma.follows.findFirst({
                where: {
                    followerId: followerId,
                    followingId: followingId,
                },
            });

            if (!checkFollow) {
                return response
                    .status(StatusCodes.BAD_GATEWAY)
                    .json(new BadRequest("unfollowed account."));
            }
            await prisma.follows.delete({
                where: {
                    followerId_followingId: {
                        followerId: followerId,
                        followingId: followingId,
                    },
                },
            });
            response.status(StatusCodes.OK).json({ message: "unfollow" });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }
}

export default new FoLLowController();
