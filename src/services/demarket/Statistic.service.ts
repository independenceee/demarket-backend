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
        } finally {
            await prisma.$disconnect();
        }
        return null;
    }

    async createStatistic() {
        try {
            const statistics = await prisma.statistics.create({
                data: {
                    totalAuthor: await prisma.account.count(),
                    totalTrending: await prisma.nft.count(),
                    totalProduct: await prisma.nft.count(),
                },
            });

            return statistics;
        } catch (error) {
            throw new ApiError(error);
        } finally {
            await prisma.$disconnect();
        }
    }

    async updateStatistics() {
        try {
            const existStatistics = await this.findManyStatistics();
            if (existStatistics?.length === 0 || !existStatistics) {
                this.createStatistic();
            } else {
                await prisma.statistics.updateMany({
                    data: {
                        totalAuthor: await prisma.account.count(),
                        totalTrending: await prisma.nft.count(),
                        totalProduct: await prisma.nft.count(),
                    },
                });
            }
        } catch (error) {
            throw new ApiError(error);
        } finally {
            await prisma.$disconnect();
        }
    }

    async deleteStatistics() {
        try {
            await prisma.statistics.deleteMany();
        } catch (error) {
            throw new ApiError(error);
        } finally {
            await prisma.$disconnect();
        }
    }
}

export default new StatisticsService();
