import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { InternalServerError, BadRequest, ApiError, NotFound } from "../errors";
import guideService from "../services/Guide.service";
import prisma from "../models";

class GuideController {
    constructor() {}

    async getAllGuides(request: Request, response: Response) {
        try {
            const PER_PAGE = 12;
            const { page } = request.query;
            const currentPage = Math.max(Number(page || 1), 1);
            const guides = await prisma.guide.findMany({
                take: PER_PAGE,
                skip: (currentPage - 1) * PER_PAGE,
            });

            response.status(StatusCodes.OK).json(guides);
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new InternalServerError(error));
        }
    }

    async getGuideId(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const guide = await guideService.findGuideById(id);

            if (!guide) {
                return response
                    .status(StatusCodes.NOT_FOUND)
                    .json(new NotFound("Guide is not found"));
            }

            response.status(StatusCodes.OK).json(guide);
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new InternalServerError(error));
        }
    }

    async createGuide(request: Request, response: Response) {
        try {
            const { description, question, title, url } = request.body;

            if (!description && !question && !title && !url) {
                return response
                    .status(StatusCodes.BAD_REQUEST)
                    .json(
                        new BadRequest(
                            "description, question, title, url has required !",
                        ),
                    );
            }

            const existGuide = await prisma.guide.findFirst({
                where: {
                    title: title,
                    url: url,
                    description: description,
                    question: question,
                },
            });

            if (existGuide) {
                return response
                    .status(StatusCodes.BAD_REQUEST)
                    .json(new ApiError("Guide already exist."));
            }

            const guide = await prisma.guide.create({
                data: {
                    description: description ? description : "",
                    question: question ? question : "",
                    title: title ? title : "",
                    url: url ? url : "",
                },
            });

            response
                .status(StatusCodes.OK)
                .json(new ApiError("Guide created successfully."));
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new InternalServerError(error));
        }
    }

    async updateGuide(request: Request, response: Response) {
        try {
            const { description, question, title, url } = request.body;
            const { id } = request.params;

            const existGuide = await guideService.findGuideById(id);
            if (!existGuide) {
                return response
                    .status(StatusCodes.BAD_REQUEST)
                    .json(new ApiError("Guide is not found."));
            }

            await prisma.guide.update({
                where: {
                    id: id,
                },
                data: {
                    description: description ? description : existGuide?.description,
                    title: title ? title : existGuide?.title,
                    question: question ? question : existGuide.question,
                    url: url ? url : existGuide.url,
                },
            });

            response.status(StatusCodes.OK).json("Update guide successfully.");
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new InternalServerError(error));
        }
    }

    async deleteGuide(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const existGuide = await guideService.findGuideById(id);
            if (!existGuide) {
                return response
                    .status(StatusCodes.BAD_REQUEST)
                    .json(new ApiError("Guide is not found."));
            }

            const guide = await prisma.guide.delete({
                where: {
                    id: id,
                },
            });

            response
                .status(StatusCodes.OK)
                .json(new ApiError("Guide delete successfully."));
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new InternalServerError(error));
        }
    }
}

export default new GuideController();
