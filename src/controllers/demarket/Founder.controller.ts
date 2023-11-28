import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { InternalServerError, NotFound } from "../../errors";
import founderService from "../../services/demarket/Founder.service";
import prisma from "../../models";
import generics from "../../constants/generics";

class FounderController {
    /**
     * @method GET => DONE
     * @description Get All founders from demarket
     * @param request { page , pageSize }
     * @param response { founders, totalPage }
     */
    async getAllFounders(request: Request, response: Response) {
        try {
            const { page, pageSize } = request.query;
            const founders = await founderService.findAllFounders({ page: Number(page), pageSize: Number(pageSize) || generics.PER_PAGE });
            response.status(StatusCodes.OK).json(founders);
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }

    /**
     * @method GET => DONE
     * @description  Get founder by id from demarket
     * @param request { id }
     * @param response { founder | null }
     * @returns
     */
    async getFounderById(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const founder = await founderService.findFounderById(id);
            if (!founder) return response.status(StatusCodes.NOT_FOUND).json(new NotFound("Founder is not found."));
            response.status(StatusCodes.OK).json(founder);
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }

    /**
     * @method POST => DONE
     * @description Get founder by id from demarket
     * @param request body: { firstName, lastName, role, company, linkedin, twitter, telegram }
     * @param response { founder | null}
     * @returns
     */
    async createFounder(request: Request, response: Response) {
        try {
            const { firstName, lastName, role, company, linkedin, twitter, telegram } = request.body;
            const files: Express.Multer.File[] | any = request.files;
            await founderService.createFounder({ firstName, lastName, role, company, linkedin, twitter, telegram }, files);
            response.status(StatusCodes.CREATED).json({ message: "founder created successfully!" });
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
    async updateFounderById(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { firstName, lastName, role, company, linkedin, twitter, telegram } = request.body;
            const files: Express.Multer.File[] | any = request.files;
            const existFounder = await founderService.findFounderById(id);
            if (!existFounder) return response.status(StatusCodes.NOT_FOUND).json(new NotFound("Founder id not found."));

            response.status(StatusCodes.OK).json({
                message: "Update founder successfully!",
            });
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

    async deleteFounderById(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const existFounder = await founderService.findFounderById(id);

            if (!existFounder) {
                return response.status(StatusCodes.NOT_FOUND).json(new NotFound("Founder id not found."));
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
