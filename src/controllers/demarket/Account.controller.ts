import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequest, InternalServerError, NotFound } from "../../errors";
import prisma, { Account } from "../../models";
import accountService from "../../services/demarket/Account.service";
import generics from "../../constants/generics";

class AccountController {
    /**
     * @method GET => OK
     * @description Get All account from database
     * @param request
     * @param response
     * @returns
     */
    async getAllAccounts(request: Request, response: Response) {
        try {
            const { page, pageSize, walletAddress } = request.query;
            if (walletAddress) {
                const accounts = await accountService.findOtherAccount({
                    walletAddress: String(walletAddress),
                    page: Number(page),
                    pageSize: Number(pageSize || generics.PER_PAGE),
                });
                response.status(StatusCodes.OK).json({ ...accounts });
            }
            const accounts = await accountService.findAllAccounts({ page: Number(page), pageSize: Number(pageSize || generics.PER_PAGE) });
            response.status(StatusCodes.OK).json({ ...accounts });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }

    /**
     * @method GET => DONE
     * @description Search account from demarket
     * @param request
     * @param response
     */
    async searchAccounts(request: Request, response: Response) {
        try {
            const { query } = request.query;
            if (!query) return response.status(StatusCodes.NOT_FOUND).json(new NotFound("Search query is required."));
            const accounts = await accountService.searchAccount(String(query));
            return response.status(StatusCodes.OK).json({ ...accounts });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }

    /**
     * @method GET => DONE
     * @description Get account by account id
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
     * @method POST => DONE
     * @description Create account width walet address
     * @param request
     * @param response
     * @returns
     */
    async createAccount(request: Request, response: Response) {
        try {
            const { walletAddress } = request.body;
            if (!walletAddress) return response.status(StatusCodes.BAD_REQUEST).json(new BadRequest("Address has been required!"));
            const existAccount = await accountService.checkDuplicateAccount(String(walletAddress));
            if (existAccount) return response.status(StatusCodes.OK).json({ ...existAccount });
            const account: Account = await accountService.createAccount({ walletAddress });
            response.status(StatusCodes.OK).json({ ...account });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        } finally {
            await prisma.$disconnect();
        }
    }

    /**
     * @method PATCH => DONE
     * @description Update account by account id
     * @param request { id }
     * @param response { message }
     * @returns
     */
    async updateAccountById(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { email, userName, description, linkedin, telegram, twitter } = request.body;
            const files: any = request.files;
            const existAccount = await accountService.findAccountById(String(id));
            if (!existAccount) return response.status(StatusCodes.NOT_FOUND).json(new NotFound("Account is not found."));
            await accountService.updateAccount({ files, description, email, existAccount, id, linkedin, userName, telegram, twitter });
            response.status(StatusCodes.OK).json({ message: "update account successfully" });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        } finally {
            await prisma.$disconnect();
        }
    }

    /**
     * @method DELETE => DONE
     * @description Delete account by account id
     * @param request { id }
     * @param response { message }
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
