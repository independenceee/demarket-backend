import { ApiError } from "../../errors";
import prisma, { Statistics } from "../../models";

class StatisticsService {
    async findManyStatistics(): Promise<Statistics[] | null> {
        try {
            const statistic = await prisma.statistics.findMany({});

            if (statistic) {
                return statistic;
            }
        } catch (error) {
            throw new ApiError(error);
        }

        return null;
    }
}

export default new StatisticsService();
