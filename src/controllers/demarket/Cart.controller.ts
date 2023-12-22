import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { InternalServerError } from "../../errors";
import prisma from "../../models";
import cartService from "../../services/demarket/Cart.service";

class CartController {
    /**
     * @method POST
     * @description Add to cart
     * @param request
     * @param response
     */
    async addNftToCart(request: Request, response: Response) {
        try {
            const { nftId, accountId } = request.query;

            const accountCart = await prisma.cart.findUnique({
                where: { accountId: String(accountId) },
            });
            if (!accountCart) {
                const newCart = await cartService.createCartByAccountId(String(accountId));
                await prisma.cartNft.create({
                    data: {
                        cartId: newCart.id,
                        nftId: String(nftId),
                    },
                });
            } else {
                await prisma.cartNft.create({
                    data: {
                        cartId: accountCart.id,
                        nftId: String(nftId),
                    },
                });
            }

            response.status(StatusCodes.OK).json({
                message: "Add nft to cart successfully",
            });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }

    /**
     * @method DELETE
     * @description
     * @param request
     * @param response
     */

    async remoteNftFromCart(request: Request, response: Response) {
        try {
            const { nftId, accountId } = request.query;
            const accountCart = await prisma.cart.findUnique({ where: { accountId: String(accountId) } });
            if (!accountCart) {
                const newCart = await cartService.createCartByAccountId(String(accountId));
                await prisma.cartNft.delete({
                    where: {
                        cartId_nftId: {
                            cartId: newCart.id,
                            nftId: String(nftId),
                        },
                    },
                });
            } else {
                await prisma.cartNft.delete({
                    where: {
                        cartId_nftId: {
                            cartId: accountCart.id,
                            nftId: String(nftId),
                        },
                    },
                });
            }

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
