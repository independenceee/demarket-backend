import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { ApiError, BadRequest, InternalServerError, NotFound } from "../../errors";
import prisma from "../../models";

import accountService from "../../services/demarket/Account.service";
import cartService from "../../services/demarket/Cart.service";
import statisticsService from "../../services/demarket/Statistic.service";

class AccountController {
    constructor() {}

    async getAccountById(request: Request, response: Response) {
        try {
            const { address } = request.query;
            const account = await accountService.findAccountByAddress(String(address));
            if (!account) {
                return response
                    .status(StatusCodes.NOT_FOUND)
                    .json(new NotFound("Account is not found."));
            }

            response.status(StatusCodes.OK).json(account);
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new InternalServerError(error));
        } finally {
            await prisma.$disconnect();
        }
    }

    async createAccount(request: Request, response: Response) {
        try {
            const { policyId, address, email, name, description } = request.body;
            const files = request.files;
            console.log(files);

            // if (!address) {
            //     return response
            //         .status(StatusCodes.BAD_REQUEST)
            //         .json(new BadRequest("Address has been required!"));
            // }

            // const existAddress = await accountService.findAccountByAddress(address);
            // if (existAddress) {
            //     return response
            //         .status(StatusCodes.FORBIDDEN)
            //         .json(new ApiError("Account has already exist."));
            // }

            // const account = await prisma.account.create({
            //     data: {
            //         name: name ? name : "",
            //         address: address,
            //         avatar: "",
            //         cover: "",
            //         description: description ? description : "",
            //         email: email ? email : "",
            //         policyId: policyId ? policyId : "",
            //         rating: 0,
            //     },
            // });

            // await cartService.createCartByAccountId(account.id);
            // await statisticsService.updateStatistics(address);

            // response.status(StatusCodes.OK).json({
            //     message: "Account created successfully.",
            // });
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new InternalServerError(error));
        } finally {
            await prisma.$disconnect();
        }
    }

    async updateAccountById(request: Request, response: Response) {
        try {
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new InternalServerError(error));
        } finally {
            await prisma.$disconnect();
        }
    }

    async deleteAccountById(request: Request, response: Response) {
        try {
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new InternalServerError(error));
        } finally {
            await prisma.$disconnect();
        }
    }
}

export default new AccountController();
