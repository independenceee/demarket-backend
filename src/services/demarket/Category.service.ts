import slugify from "slugify";
import { ApiError } from "../../errors";
import prisma, { Category } from "../../models";

class CategoryService {
    async findAllCategories(): Promise<Category[] | null> {
        try {
            const categories = await prisma.category.findMany();
            if (categories) return categories;
        } catch (error) {
            throw new ApiError(error);
        } finally {
            prisma.$disconnect();
        }
        return null;
    }

    async findCategoryById(id: string): Promise<Category | null> {
        try {
            const category = await prisma.category.findFirst({ where: { id: id } });
            if (category) return category;
        } catch (error) {
            throw new ApiError(error);
        } finally {
            prisma.$disconnect();
        }
        return null;
    }

    async findCategoryByName(name: string): Promise<Category | null> {
        try {
            const category = await prisma.category.findFirst({ where: { name: name } });
            if (category) return category;
        } catch (error) {
            throw new ApiError(error);
        } finally {
            prisma.$disconnect();
        }
        return null;
    }
    async createCategory({ name }: { name: string }): Promise<void> {
        try {
            await prisma.category.create({ data: { name: name, slug: slugify(name) } });
        } catch (error) {
            throw new ApiError(error);
        } finally {
            prisma.$disconnect();
        }
    }

    async updateCategory({ id, name, existCategory }: { id: string; name: string; existCategory: Category }) {
        try {
            await prisma.category.update({
                where: { id: id },
                data: { name: name ? name : existCategory.name, slug: name ? slugify(name) : existCategory.slug },
            });
        } catch (error) {
            throw new ApiError(error);
        } finally {
            prisma.$disconnect();
        }
    }

    async deleteCategory(id: string) {
        try {
            await prisma.category.delete({ where: { id: id } });
        } catch (error) {
            throw new ApiError(error);
        } finally {
            prisma.$disconnect();
        }
    }
}

export default new CategoryService();
