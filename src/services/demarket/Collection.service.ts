import prisma, { Collection } from "../../models";
import { ApiError } from "../../errors";

class CollectionService {
    async findAllCollections(page: number): Promise<Collection[] | null> {
        try {
            const PER_PAGE = 12;
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
        } catch (error) {
            throw new ApiError(error);
        }
        return null;
    }
}

export default new CollectionService();
