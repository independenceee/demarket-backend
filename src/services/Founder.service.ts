import { ApiError } from "../errors";
import prisma, { Founder } from "../models";

class FounderService {
    PER_PAGE = 12;
    async findFounderById(id: string): Promise<Founder | null> {
        try {
            const founder = await prisma.founder.findFirst({
                where: {
                    id: id,
                },
            });

            if (founder) {
                return founder;
            }
        } catch (error) {
            throw new ApiError(error);
        }

        return null;
    }

    async findAllFounder(page: number): Promise<Founder[] | null> {
        try {
            const currentPage = Math.max(Number(page || 1), 1);
            const founders = await prisma.founder.findMany({
                take: this.PER_PAGE,
                skip: (currentPage - 1) * this.PER_PAGE,
            });

            if (founders) {
                return founders;
            }
        } catch (error) {
            throw new ApiError(error);
        }

        return null;
    }
}

export default new FounderService();
