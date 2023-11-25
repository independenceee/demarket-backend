import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { InternalServerError } from "../../errors";
import prisma from "../../models";

class CartController {
    /**
     * @method
     * @description
     * @param request
     * @param response
     */
    async addNftToCart(request: Request, response: Response) {
        try {
            const { nftId, cartId } = request.query;
            await prisma.cartNft.create({
                data: {
                    cartId: String(cartId),
                    nftId: String(nftId),
                },
            });

            response.status(StatusCodes.OK).json({
                message: "Add nft to cart successfully",
            });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }

    /**
     *
     * @param request
     * @param response
     */

    async remoteNftFromCart(request: Request, response: Response) {
        try {
            const { nftId, cartId } = request.query;
            await prisma.cartNft.delete({
                where: {
                    cartId_nftId: {
                        cartId: String(cartId),
                        nftId: String(nftId),
                    },
                },
            });

            response.status(StatusCodes.OK).json({
                message: "Remove nft from cart successfully",
            });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }

    /**
     *
     * @param request
     * @param response
     */
    async getCartById(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { accountId } = request.query;

            const cart = await prisma.cart.findFirst({
                where: {
                    id: id,
                    accountId: String(accountId),
                },
            });

            response.status(StatusCodes.OK).json(cart);
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }

    /**
     *
     * @param request
     * @param response
     */
    async createCart(request: Request, response: Response) {
        try {
            const { accountId } = request.query;
            await prisma.cart.create({
                data: {
                    accountId: String(accountId),
                },
            });
            response.status(StatusCodes.OK).json({
                message: "Create cart successfully",
            });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }

    /**
     *
     * @param request
     * @param response
     */
    async updateCartById(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { accountId } = request.query;
            await prisma.cart.update({
                where: {
                    id: id,
                },
                data: {
                    accountId: String(accountId),
                },
            });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }

    /**
     *
     * @param request
     * @param response
     */
    async deleteCartById(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { accountId } = request.query;
            await prisma.cart.delete({
                where: {
                    id: id,
                    accountId: String(accountId),
                },
            });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }
}

export default new CartController();
