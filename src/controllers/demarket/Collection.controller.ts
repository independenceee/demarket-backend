import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { InternalServerError, NotFound, BadRequest } from "../../errors";

import statisticService from "../../services/demarket/Statistic.service";
import collectionService from "../../services/demarket/Collection.service";
import prisma from "../../models";

class CollectionController {
    async createCollection(request: Request, response: Response) {
        try {
            const { accountId } = request.query;
            const { title, description, url } = request.body;

            /**
             * Handle file
             */
            const files = request.files;

            if (!title || !description || !url || !accountId) {
                return response
                    .status(StatusCodes.BAD_REQUEST)
                    .json(
                        new BadRequest(
                            "Title , description, url, accountId has required.",
                        ),
                    );
            }

            await prisma.collection.create({
                data: {
                    title: title,
                    description: description,
                    accoutnId: String(accountId),
                    url: url,
                    avatar: "",
                    cover: "",
                },
            });

            await statisticService.updateStatistics({ description, title });

            response.status(StatusCodes.OK).json({
                message: "collection create successfully.",
            });
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new InternalServerError(error));
        }
    }
}

export default new CollectionController();
