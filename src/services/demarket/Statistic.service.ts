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

    async createStatistic({
        address,
        title,
        description,
        trending,
        policyId,
        assetName,
    }: {
        address?: string | null;
        title?: string | null;
        description?: string | null;
        trending?: string | null;
        policyId?: string | null;
        assetName?: string | null;
    }) {
        try {
            await prisma.statistics.create({
                data: {
                    totalAuthor: address ? 1 : 0,
                    totalCollection: title && description ? 1 : 0,
                    totalTrending: trending ? 1 : 0,
                    totalProduct: policyId && assetName ? 1 : 0,
                },
            });
        } catch (error) {
            throw new ApiError(error);
        }
    }

    async updateStatistics({
        address,
        title,
        description,
        trending,
        policyId,
        assetName,
    }: {
        address?: string | null;
        title?: string | null;
        description?: string | null;
        trending?: string | null;
        policyId?: string | null;
        assetName?: string | null;
    }) {
        try {
            const existStatistics = await this.findManyStatistics();
            if (existStatistics?.length === 0 || !existStatistics) {
                this.createStatistic({
                    address,
                    assetName,
                    description,
                    policyId,
                    title,
                    trending,
                });
            } else {
                await prisma.statistics.updateMany({
                    data: {
                        totalAuthor: address
                            ? existStatistics[0].totalAuthor + 1
                            : existStatistics[0].totalAuthor,
                        totalCollection:
                            title && description
                                ? existStatistics[0].totalCollection + 1
                                : existStatistics[0].totalCollection,
                        totalProduct:
                            policyId && assetName
                                ? existStatistics[0].totalProduct + 1
                                : existStatistics[0].totalProduct,

                        totalTrending: trending
                            ? existStatistics[0].totalTrending + 1
                            : existStatistics[0].totalTrending,
                    },
                });
            }
        } catch (error) {
            throw new ApiError(error);
        }
    }
}

export default new StatisticsService();
