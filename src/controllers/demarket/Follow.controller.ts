import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { InternalServerError, NotFound } from "../../errors";
import followService from "../../services/demarket/Follow.service";
import accountService from "../../services/demarket/Account.service";

class FoLLowController {
    /**
     * @description FOLLOW ACCOUNT BUY ACCOUNT ID
     * @param request
     * @param response
     * @returns
     */
    async createFollowAccount(request: Request, response: Response) {
        try {
            const { followingId, followerId } = request.body;
            const accountFollowing = await accountService.findAccountById(followingId);
            if (!accountFollowing) return response.status(StatusCodes.NOT_FOUND).json(new NotFound("Account is not found."));
            const accountFollower = await accountService.findAccountById(followerId);
            if (!accountFollower) return response.status(StatusCodes.NOT_FOUND).json(new NotFound("Account is not found."));
            const existAccountFollow = await followService.checkFollowExistAccount({ followerId: followerId, followingId: followingId });
            if (existAccountFollow) return response.status(StatusCodes.BAD_REQUEST).json("Follow account has already exist.");
            await followService.createFollowAccount({ followerId: followerId, followingId: followingId });
            response.status(StatusCodes.OK).json({ message: "Follow account sucessfully." });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }

    async deleteFollowAccount(request: Request, response: Response) {
        try {
            const { followingId, followerId } = request.body;
            const accountFollowing = await accountService.findAccountById(followingId);
            if (!accountFollowing) return response.status(StatusCodes.NOT_FOUND).json(new NotFound("Account is not found."));
            const accountFollower = await accountService.findAccountById(followerId);
            if (!accountFollower) return response.status(StatusCodes.NOT_FOUND).json(new NotFound("Account is not found."));
            const existAccountFollow = await followService.checkFollowExistAccount({ followerId: followerId, followingId: followingId });
            if (existAccountFollow) return response.status(StatusCodes.BAD_REQUEST).json("Follow account is not found.");
            await followService.createFollowAccount({ followerId: followerId, followingId: followingId });
            response.status(StatusCodes.OK).json({ message: "Unfollow account successfully." });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }
}

export default new FoLLowController();
