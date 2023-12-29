import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { InternalServerError, NotFound } from "../../errors";
import accountService from "../../services/demarket/Account.service";
import nftService from "../../services/demarket/Nft.service";
import cartService from "../../services/demarket/Cart.service";

class CartController {
    /**
     * @method POST => DONE
     * @description Add to cart
     * @param request
     * @param response
     */
    async addNftToCart(request: Request, response: Response) {
        try {
            const { nftId, accountId } = request.query;
            const nft = await nftService.findNftById(String(nftId));
            if (!nft) return response.status(StatusCodes.NOT_FOUND).json(new NotFound("Nft is not found."));
            const account = await accountService.findAccountById(String(accountId));
            if (!account) return response.status(StatusCodes.NOT_FOUND).json(new NotFound("Account is not found."));
            const cartExist = await cartService.findCartByAccountId(String(accountId));
            if (!cartExist) {
                const newCart = await cartService.createCartByAccountId(String(accountId));
                await cartService.addNftToCart({ nftId: String(nftId), cartId: newCart.id });
            } else {
                await cartService.addNftToCart({ nftId: String(nftId), cartId: cartExist.id });
            }
            response.status(StatusCodes.OK).json({ message: "Add nft to cart successfully" });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }

    /**
     * @method DELETE => DONE
     * @description Remove from cart
     * @param request
     * @param response
     */

    async remoteNftFromCart(request: Request, response: Response) {
        try {
            const { nftId, accountId } = request.query;
            const nft = await nftService.findNftById(String(nftId));
            if (!nft) return response.status(StatusCodes.NOT_FOUND).json(new NotFound("Nft is not found."));
            const account = await accountService.findAccountById(String(accountId));
            if (!account) return response.status(StatusCodes.NOT_FOUND).json(new NotFound("Account is not found."));
            const cartExist = await cartService.findCartByAccountId(String(accountId));
            if (!cartExist) {
                const newCart = await cartService.createCartByAccountId(String(accountId));
                await cartService.removeNftFromCart({ nftId: String(nftId), cartId: newCart.id });
            } else {
                await cartService.removeNftFromCart({ nftId: String(nftId), cartId: cartExist.id });
            }
            response.status(StatusCodes.OK).json({ message: "Remove nft from cart successfully" });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }
}

export default new CartController();
