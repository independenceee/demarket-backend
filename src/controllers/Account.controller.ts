import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { InternalServerError } from "../errors";
import prisma from "../models";

class AccountController {
    

    constructor() {

    }
    
    async getAllAccounts(request: Request, response: Response) {
        try {
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new InternalServerError(error));
        } finally {
            await prisma.$disconnect();
        }
    }

    async getAccountById(request: Request, response: Response) {
        try {
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
