import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequest, InternalServerError, NotFound } from "../../errors";
import accountService from "../../services/demarket/Account.service";
import nftService from "../../services/demarket/Nft.service";
import likeService from "../../services/demarket/Like.service";

class LikeController {
    /**
     * @method POST => DONE
     * @description CREATE LIKE NFT BY ACCOUNT USING NFTID AND ACCOUNT ID
     * @param request { accountId, nftId }
     * @param response { message }
     * @returns
     */
    async addLikeNftByAccountId(request: Request, response: Response) {
        try {
            const { accountId, nftId } = request.body;
            const account = await accountService.findAccountById(String(accountId));
            if (!account) return response.status(StatusCodes.NOT_FOUND).json(new NotFound("Account is not found."));
            const nft = await nftService.findNftById(String(nftId));
            if (!nft) return response.status(StatusCodes.NOT_FOUND).json(new NotFound("Nft is not found."));
            const existLike = await likeService.checkLikeExist({ nftId: String(nftId), accountId: String(accountId) });
            if (existLike) return response.status(StatusCodes.BAD_REQUEST).json(new BadRequest("Nft like buy account has already exist."));
            await likeService.createLikeNftFromAccount({ nftId: String(nftId), accountId: String(accountId) });
            return response.status(StatusCodes.OK).json({ message: "Like asset successfully." });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }

    /**
     * @method DELETE DONE
     * @description DELETE LIKE NFT BY ACCOUNT USING NFTID AND ACCOUNT ID
     * @param request { accountId, nftId }
     * @param response { message }
     * @returns
     */
    async deleteLikeNftByAccountId(request: Request, response: Response) {
        try {
            const { accountId, nftId } = request.body;
            const account = await accountService.findAccountById(String(accountId));
            if (!account) return response.status(StatusCodes.NOT_FOUND).json(new NotFound("Account is not found."));
            const nft = await nftService.findNftById(String(nftId));
            if (!nft) return response.status(StatusCodes.NOT_FOUND).json(new NotFound("Nft is not found."));
            const existLike = await likeService.checkLikeExist({ nftId: String(nftId), accountId: String(accountId) });
            if (!existLike) return response.status(StatusCodes.BAD_REQUEST).json(new BadRequest("Nft like buy account is not found."));
            await likeService.deleteLikeNftFromAccount({ nftId: String(nftId), accountId: String(accountId) });
            response.status(StatusCodes.OK).json({ message: "Unlike asset successfully." });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }
}

export default new LikeController();
