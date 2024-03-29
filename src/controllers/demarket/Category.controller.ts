import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequest, InternalServerError, NotFound } from "../../errors";
import categoryService from "../../services/demarket/Category.service";

class CategoryController {
    /**
     * @method GET => DONE
     * @description Get all category
     * @param request
     * @param response [ category ]
     */
    async getAllCategores(request: Request, response: Response) {
        try {
            const categories = await categoryService.findAllCategories();
            response.status(StatusCodes.OK).json(categories);
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError({ error }));
        }
    }

    /**
     * @method GET => DONE
     * @description Get category by id
     * @param request { id }
     * @param response category
     * @returns
     */
    async getCategory(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const existCategory = await categoryService.findCategoryById(id);
            if (!existCategory) return response.status(StatusCodes.NOT_FOUND).json(new NotFound("Category is not found."));
            response.status(StatusCodes.OK).json(existCategory);
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError({ error }));
        }
    }

    /**
     * @method POST => DONE
     * @description Create Category
     * @param request { name: string}
     * @param response message
     * @returns
     */
    async createCategory(request: Request, response: Response) {
        try {
            const { name } = request.body;
            if (!name) return response.status(StatusCodes.BAD_REQUEST).json(new BadRequest("Name has been required!"));
            const existCategory = await categoryService.findCategoryByName(name);
            if (existCategory) return response.status(StatusCodes.NOT_FOUND).json(new NotFound("Category already exist."));
            await categoryService.createCategory({ name });
            response.status(StatusCodes.CREATED).json({ message: "Category created successfully." });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError({ error }));
        }
    }

    /**
     * @method PATCH
     * @description Update category
     * @param request { id , name }
     * @param response
     * @returns
     */

    async updateCategory(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { name } = request.body;
            const existCategory = await categoryService.findCategoryById(id);
            if (!existCategory) return response.status(StatusCodes.NOT_FOUND).json(new NotFound("Category is not found."));
            await categoryService.updateCategory({ id, name, existCategory });
            response.status(StatusCodes.OK).json({ message: "Update category successfully." });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError({ error }));
        }
    }

    /**
     * @method DELETE => DONE
     * @param request { id }
     * @param response
     * @returns
     */
    async deleteCategory(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const existCategory = await categoryService.findCategoryById(id);
            if (!existCategory) return response.status(StatusCodes.NOT_FOUND).json(new NotFound("Category is not found."));
            await categoryService.deleteCategory(id);
            response.status(StatusCodes.OK).json({ message: "Delete category successfully." });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError({ error }));
        }
    }
}

export default new CategoryController();
