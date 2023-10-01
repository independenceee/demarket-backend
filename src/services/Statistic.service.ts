import { ApiError } from "../errors";
import prisma, { Statistics } from "../models";

class StatisticsService {
    async findStatisticById(id: string): Promise<Statistics | null> {
        try {
            const statistic = await prisma.statistics.findFirst({
                where: {
                    id: id,
                },
            });

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
