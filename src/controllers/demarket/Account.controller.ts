import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequest, InternalServerError, NotFound } from "../../errors";
import prisma, { Account } from "../../models";
import accountService from "../../services/demarket/Account.service";
import generics from "../../constants/generics";
class AccountController {
    /**
     * @method GET
     * @description Get All account from database
     * @param request
     * @param response
     * @returns
     */
    async getAllAccounts(request: Request, response: Response) {
        try {
            const { page, pageSize } = request.query;
            const accounts = await accountService.findAllAccounts({ page: Number(page), pageSize: Number(pageSize || generics.PER_PAGE) });
            response.status(StatusCodes.OK).json({ ...accounts });
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
            if (!existAccount) return response.status(StatusCodes.NOT_FOUND).json(new NotFound("Account is not found."));
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
            const { address, email, name, description, linkedin, telegram, twitter } = request.body;
            if (!address) return response.status(StatusCodes.BAD_REQUEST).json(new BadRequest("Address has been required!"));
            const existAccount = await accountService.checkDuplicateAccount(String(address));
            if (existAccount) return response.status(StatusCodes.OK).json({ ...existAccount });
            const account: Account = await accountService.createAccount({ address, name, description, email, linkedin, telegram, twitter });
            response.status(StatusCodes.OK).json({ ...account });
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
            const { email, name, description, linkedin, telegram, twitter } = request.body;
            const files: any = request.files;
            const existAccount = await accountService.findAccountById(String(id));
            if (!existAccount) return response.status(StatusCodes.NOT_FOUND).json(new NotFound("Account is not found."));
            await accountService.updateAccount({ files, description, email, existAccount, id, linkedin, name, telegram, twitter });
            response.status(StatusCodes.OK).json({ message: "update account successfully" });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        } finally {
            await prisma.$disconnect();
        }
    }

    /**
     * @method DELETE
     * @param request
     * @param response
     * @returns
     */
    async deleteAccountById(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const existAccount = await accountService.findAccountById(String(id));
            if (!existAccount) return response.status(StatusCodes.NOT_FOUND).json(new NotFound("Account is not found."));
            await accountService.deleteAccount(String(id));
            response.status(StatusCodes.OK).json({ message: "Delete account successfully" });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }
}

export default new AccountController();
