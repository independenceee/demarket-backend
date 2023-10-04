import prisma, { Collection } from "../../models";
import generics from "../../constants/generics";
import { ApiError } from "../../errors";

class CollectionService {
    async findAllCollections(page: number): Promise<Collection[] | null> {
        try {
            const PER_PAGE = generics.PER_PAGE;
            const currentPage = Math.max(Number(page || 1), 1);

            const collections = await prisma.collection.findMany({
                take: PER_PAGE,
                skip: (currentPage - 1) * PER_PAGE,
            });

            if (collections) {
                return collections;
            }
        } catch (error) {
            throw new ApiError(error);
        }

        return null;
    }

    async findCollectionById(id: string): Promise<Collection | null> {
        try {
            const collection = await prisma.collection.findFirst({
                where: {
                    id: id,
                },
            });

            if (collection) {
                return collection;
            }
        } catch (error) {
            throw new ApiError(error);
        }
        return null;
    }
    async checkDuplicate({
        title,
        description,
        url,
    }: {
        title?: string;
        description?: string;
        url?: string;
    }): Promise<number> {
        try {
            const collection = await prisma.collection.count({
                where: {
                    title: title,
                    description: description,
                },
            });

            return collection;
        } catch (error) {
            throw new ApiError(error);
        }
    }

    async deleteCollectionById(id: string) {
        try {
            await prisma.collection.delete({
                where: {
                    id: id,
                },
            });
        } catch (error) {
            throw new ApiError(error);
        } finally {
            await prisma.$disconnect();
        }
    }
}

export default new CollectionService();
