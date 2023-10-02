import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { InternalServerError } from "../../errors";
import prisma from "../../models";

class CartController {
    async getAllCarts(request: Request, response: Response) {
        try {
            const carts = await prisma.cart.findMany();
            response.status(StatusCodes.OK).json(carts);
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new InternalServerError(error));
        }
    }

    async getCartById(request: Request, response: Response) {
        try {
            const { address } = request.query;

            const cart = await prisma.cart.findFirst({
                where: {
                    address: address?.toString(),
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
            const { address } = request.query;

            const cart = await prisma.cart.create({
                data: {
                    address: String(address),
                },
            });

            response.status(StatusCodes.OK).json({
                message: "Create cart from address successfully",
            });
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new InternalServerError(error));
        }
    }

    async updateCartByAddress(request: Request, response: Response) {
        try {
            const { address } = request.query;
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new InternalServerError(error));
        }
    }

    async deleteCartByAddress(request: Request, response: Response) {
        try {
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new InternalServerError(error));
        }
    }
}

export default new CartController();
