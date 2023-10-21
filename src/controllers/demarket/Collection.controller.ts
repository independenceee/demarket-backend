import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { InternalServerError, NotFound, BadRequest } from "../../errors";

import collectionService from "../../services/demarket/Collection.service";
import prisma from "../../models";

class CollectionController {
    /**
     * @param request
     * @param response
     * @returns
     */

    async getAllCollections(request: Request, response: Response) {
        try {
            const { page } = request.query;
            const collections = await collectionService.findAllCollections(Number(page));
            response.status(StatusCodes.OK).json(collections);
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }

    /**
     * @param request
     * @param response
     * @returns
     */
    async getCollectionById(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const existCollection = await collectionService.findCollectionById(id);
            if (!existCollection) {
                return response
                    .status(StatusCodes.NOT_FOUND)
                    .json(new NotFound("Collection is not found."));
            }

            response.status(StatusCodes.OK).json(existCollection);
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
    async createCollection(request: Request, response: Response) {
        try {
            const { accountId } = request.query;
            const { title, description, url } = request.body;
            const { files } = request;

            if (!title || !description || !url || !accountId) {
                return response
                    .status(StatusCodes.BAD_REQUEST)
                    .json(new BadRequest("Title , description, url, accountId has required."));
            }

            const duplicate = await collectionService.checkDuplicate({
                title,
                description,
            });

            if (duplicate > 0) {
                return response.status(StatusCodes.FORBIDDEN).json({
                    message: "Colection has already exist.",
                });
            }

            await prisma.collection.create({
                data: {
                    title: title,
                    description: description,
                    accoutnId: String(accountId),
                    url: url,
                    avatar: "files.avatar[0].filename",
                    cover: "files.cover[0].filename",
                    // avatar: files.avatar[0].filename,
                    // cover: files.cover[0].filename,
                },
            });

            response.status(StatusCodes.OK).json({
                message: "collection create successfully.",
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
    async updateCollectionById(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { title, description, url } = request.body;
            const files: any = request.files;

            const existCollection = await collectionService.findCollectionById(id);
            if (!existCollection) {
                return response
                    .status(StatusCodes.NOT_FOUND)
                    .json(new NotFound("Collection is not found."));
            }

            await prisma.collection.update({
                where: {
                    id: id,
                },
                data: {
                    title: title ? title : existCollection.title,
                    description: description ? description : existCollection.description,
                    url: url ? url : existCollection.url,
                    avatar: files.avatar[0].filename
                        ? files.avatar[0].filename
                        : existCollection.avatar,
                    cover: files.cover[0].filename
                        ? files.files.cover[0].filename
                        : existCollection.cover,
                },
            });

            response.status(StatusCodes.OK).json({
                message: "Update collection successfully.",
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
    async deleteCollectionById(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const existCollection = await collectionService.findCollectionById(id);
            if (!existCollection) {
                return response
                    .status(StatusCodes.NOT_FOUND)
                    .json(new NotFound("Collection is not found."));
            }
            await collectionService.deleteCollectionById(id);
            response.status(StatusCodes.OK).json({
                message: "Delete collection successfully.",
            });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }
}

export default new CollectionController();
