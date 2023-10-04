import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { InternalServerError, NotFound } from "../../errors";
import categoryService from "../../services/demarket/Category.service";
import prisma from "../../models";

class CategoryController {
    async getAllCategores(request: Request, response: Response) {
        try {
            const categories = await categoryService.findAllCategories();
            response.status(StatusCodes.OK).json(categories);
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new InternalServerError(error));
        }
    }

    async getCategory(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const existCategory = await categoryService.findCategoryById(id);
            if (!existCategory) {
                return response
                    .status(StatusCodes.NOT_FOUND)
                    .json(new NotFound("Category is not found."));
            }

            response.status(StatusCodes.OK).json(existCategory);
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new InternalServerError(error));
        }
    }

    async createCategory(request: Request, response: Response) {
        try {
            const { name } = request.body;
            const existCategory = await categoryService.findCategoryByName(name);
            if (existCategory) {
                return response
                    .status(StatusCodes.NOT_FOUND)
                    .json(new NotFound("Category already exist."));
            }
            await categoryService.createCategory({ name });
            response.status(StatusCodes.CREATED).json({
                message: "Category created successfully.",
            });
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new InternalServerError(error));
        }
    }

    async updateCategory(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { name } = request.body;
            const existCategory = await categoryService.findCategoryById(id);
            if (!existCategory) {
                return response
                    .status(StatusCodes.NOT_FOUND)
                    .json(new NotFound("Category is not found."));
            }
            await prisma.category.update({
                where: { id: id },
                data: { name: name ? name : existCategory.name },
            });
            response.status(StatusCodes.OK).json({
                message: "Update category successfully.",
            });
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new InternalServerError(error));
        } finally {
            prisma.$disconnect();
        }
    }

    async deleteCategory(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const existCategory = await categoryService.findCategoryById(id);
            if (!existCategory) {
                return response
                    .status(StatusCodes.NOT_FOUND)
                    .json(new NotFound("Category is not found."));
            }
            await categoryService.deleteCategory(id);
            response.status(StatusCodes.OK).json({
                message: "Delete category successfully.",
            });
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new InternalServerError(error));
        }
    }
}

export default new CategoryController();