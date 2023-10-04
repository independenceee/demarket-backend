import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequest, InternalServerError, NotFound } from "../../errors";
import prisma from "../../models";
import accountService from "../../services/demarket/Account.service";
import cartService from "../../services/demarket/Cart.service";

class AccountController {
    /**
     *
     * @param request
     * @param response
     */
    async getAllAccounts(request: Request, response: Response) {
        try {
            const { page } = request.query;
            const accounts = await accountService.findAllAccounts(Number(page));
            response.status(StatusCodes.OK).json(accounts);
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
    async getAccountById(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const existAccount = await accountService.findAccountById(String(id));
            if (!existAccount) {
                return response
                    .status(StatusCodes.NOT_FOUND)
                    .json(new NotFound("Account is not found."));
            }

            response.status(StatusCodes.OK).json(existAccount);
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
    async createAccount(request: Request, response: Response) {
        try {
            const { policyId, address, email, name, description } = request.body;
            const files: any = request.files;

            if (!address || !name || !description) {
                return response
                    .status(StatusCodes.BAD_REQUEST)
                    .json(new BadRequest("Address has been required!"));
            }

            const existAccount = await accountService.checkDuplicateAccount(String(address));
            if (existAccount) {
                return response.status(StatusCodes.OK).json(existAccount);
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
            response.status(StatusCodes.OK).json(account);
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
    async updateAccountById(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { email, name, description } = request.body;
            const files: any = request.files;

            const existAccount = await accountService.findAccountById(String(id));
            if (!existAccount) {
                return response
                    .status(StatusCodes.NOT_FOUND)
                    .json(new NotFound("Account is not found."));
            }

            await prisma.account.update({
                where: {
                    id: id,
                },
                data: {
                    // avatar: files ? files.avatar[0].filename : existAccount.avatar,
                    // cover: files ? files.cover[0].filename : existAccount.cover,
                    avatar: files.avatar[0].filename
                        ? files.avatar[0].filename
                        : existAccount.avatar,
                    cover: files.cover[0].filename ? files.cover[0].filename : existAccount.cover,
                    description: description ? description : existAccount.description,
                    email: email ? email : existAccount.email,
                    name: name ? name : existAccount.name,
                },
            });

            response.status(StatusCodes.OK).json({
                message: "update account successfully",
            });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        } finally {
            await prisma.$disconnect();
        }
    }
}

export default new AccountController();
