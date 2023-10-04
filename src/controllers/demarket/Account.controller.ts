import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { ApiError, BadRequest, InternalServerError, NotFound } from "../../errors";
import prisma from "../../models";

import accountService from "../../services/demarket/Account.service";
import cartService from "../../services/demarket/Cart.service";
import statisticsService from "../../services/demarket/Statistic.service";

class AccountController {
    async createAccount(request: Request, response: Response) {
        try {
            const { policyId, address, email, name, description } = request.body;
            const files: any = request.files;
            console.log(request.body);

            if (!address || !name || !description) {
                return response
                    .status(StatusCodes.BAD_REQUEST)
                    .json(new BadRequest("Address has been required!"));
            }

            const existAddress = await accountService.findAccountByAddress(address);
            if (existAddress) {
                const account = await accountService.findAccountByAddress(
                    String(address),
                );
                return response.status(StatusCodes.OK).json(account);
            }

            const account = await prisma.account.create({
                data: {
                    name: name ? name : "",
                    address: address,
                    avatar: "files.avatar[0].filename",
                    cover: "files.cover[0].filename",
                    // avatar: files.avatar[0].filename,
                    // cover: files.cover[0].filename,
                    description: description ? description : "",
                    email: email ? email : "",
                    policyId: policyId ? policyId : "",
                },
            });

            await cartService.createCartByAccountId(account.id);
            await statisticsService.updateStatistics(address);

            response.status(StatusCodes.OK).json(account);
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
}

export default new AccountController();
