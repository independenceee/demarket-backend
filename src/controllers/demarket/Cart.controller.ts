import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { InternalServerError } from "../../errors";
import prisma from "../../models";

class CartController {
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
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new InternalServerError(error));
        }
    }

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
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new InternalServerError(error));
        }
    }

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
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new InternalServerError(error));
        }
    }

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
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new InternalServerError(error));
        }
    }

    
    
}

export default new CartController();
