import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequest, InternalServerError, NotFound } from "../../errors";
import prisma from "../../models";
import followService from "../../services/demarket/Follow.service";
import accountService from "../../services/demarket/Account.service";
import generics from "../../constants/generics";

class FoLLowController {
    /**
     *
     * @param request
     * @param response
     * @returns
     */
    async getFolloweds(request: Request, response: Response) {
        try {
            const { walletAddress, page, pageSize } = request.query;
            if (!walletAddress) response.status(StatusCodes.NOT_FOUND).json(new NotFound("address has been required."));
            const existAccount = await accountService.findAccountByAddress(String(walletAddress));
            if (!existAccount) return response.status(StatusCodes.NOT_FOUND).json(new NotFound("address has been required."));
            const followers = await followService.findAccountFollowedsByAccount({
                accountId: existAccount?.id,
                page: Number(page),
                pageSize: Number(pageSize || generics.PER_PAGE),
            });

            response.status(StatusCodes.OK).json({ ...followers });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }

    /**
     *
     * @param request
     * @param response
     * @returns
     */
    async getFollowings(request: Request, response: Response) {
        try {
            const { walletAddress, page, pageSize } = request.query;
            if (!walletAddress) response.status(StatusCodes.NOT_FOUND).json(new NotFound("address has been required."));
            const existAccount = await accountService.findAccountByAddress(String(walletAddress));
            if (!existAccount) return response.status(StatusCodes.NOT_FOUND).json(new NotFound("address has been required."));
            const followings = await followService.findAccountFollowingsByAccount({
                accountId: existAccount.id,
                page: Number(page),
                pageSize: Number(pageSize || generics.PER_PAGE),
            });
            response.status(StatusCodes.OK).json({ ...followings });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        } finally {
            await prisma.$disconnect();
        }
    }
    /**
     *
     * @param request
     * @param response
     * @returns
     */
    async addFollow(request: Request, response: Response) {
        try {
            const { followingId, followerId } = request.body;
            const existingFollow = await prisma.follows.findUnique({
                where: { followerId_followingId: { followerId, followingId } },
            });

            if (existingFollow) {
                return response.status(StatusCodes.BAD_GATEWAY).json(new BadRequest("followed account."));
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
                return response.status(StatusCodes.BAD_GATEWAY).json(new BadRequest("unfollowed account."));
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
