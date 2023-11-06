import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { InternalServerError, NotFound } from "../../errors";
import founderService from "../../services/demarket/Founder.service";
import prisma from "../../models";

class FounderController {
    async getAllFounders(request: Request, response: Response) {
        try {
            const { page } = request.query;

            const founders = await founderService.findAllFounder(Number(page));
            console.log(founders);
            response.status(StatusCodes.OK).json(founders);
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }

    async getFounderById(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const founder = await founderService.findFounderById(id);

            if (!founder) {
                return response
                    .status(StatusCodes.NOT_FOUND)
                    .json(new NotFound("Founder is not found."));
            }

            response.status(StatusCodes.OK).json(founder);
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }

    async createFounder(request: Request, response: Response) {
        try {
            const { firstName, lastName, role, company, linkedin, twitter, telegram } =
                request.body;
            const files: Express.Multer.File[] | any = request.files;

            await prisma.founder.create({
                data: {
                    fistName: firstName,
                    lastName: lastName,
                    role: role,
                    avatar: process.env.DOMAIN_NAME! + "/founder/" + files[0].filename,
                    company: company ? company : "BLOCKALPHA",
                    linkedin: linkedin ? linkedin : "",
                    twitter: twitter ? twitter : "",
                    telegram: telegram ? telegram : "",
                },
            });

            response.status(StatusCodes.CREATED).json({
                message: "founder created successfully!",
            });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }

    async updateFounderById(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const {} = request.body;

            const existFounder = await founderService.findFounderById(id);
            if (!existFounder) {
                return response
                    .status(StatusCodes.NOT_FOUND)
                    .json(new NotFound("Founder id not found."));
            }

            response.status(StatusCodes.OK).json({
                message: "Update founder successfully!",
            });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }

    async deleteFounderById(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const existFounder = await founderService.findFounderById(id);

            if (!existFounder) {
                return response
                    .status(StatusCodes.NOT_FOUND)
                    .json(new NotFound("Founder id not found."));
            }

            response.status(StatusCodes.OK).json({
                message: "Delete founder successfully.",
            });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }
}

export default new FounderController();
