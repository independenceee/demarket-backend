import { ApiError } from "../../errors";
import prisma from "../../models";

class StatisticsService {
    async findStatistics() {
        try {
            const totalTransaction = (await prisma.nft.aggregate({ _sum: { countOfTransaction: true } }))._sum.countOfTransaction;
            const totalTrending = await prisma.nft.count({ where: { countOfTransaction: { gt: 10 } } });
            const totalAccount = await prisma.account.count();
            const totalProduct = await prisma.nft.count();
            return { totalAccount, totalTrending, totalProduct, totalTransaction };
        } catch (error) {
            throw new ApiError(error);
        } finally {
            await prisma.$disconnect();
        }
    }
}

export default new StatisticsService();
