import { ApiError } from "../../errors";
import prisma from "../../models";
import apiBlockfrost from "../../utils/blockfrost";
import { post } from "../../utils/koios";

class StatisticsService {
    async totalAccounts() {
        try {
            const totalAccounts = prisma.account.count();
            return totalAccounts;
        } catch (error) {
            throw new ApiError(error);
        } finally {
            await prisma.$disconnect();
        }
    }

    async totalProducts(contractAddress: string) {
        try {
            const data = await post("/address_assets", { _addresses: [contractAddress] });
            return data[0].asset_list.length;
        } catch (error) {
            throw new ApiError(error);
        }
    }

    async totalTransactions(contractAddress: string) {
        try {
            const data = await apiBlockfrost.addressesTransactions(contractAddress);
            return data.length;
        } catch (error) {
            throw new ApiError(error);
        }
    }

    async totalTrendings() {
        try {
            const totalAccounts = prisma.account.count();
            return totalAccounts;
        } catch (error) {
            throw new ApiError(error);
        } finally {
            await prisma.$disconnect();
        }
    }
}

export default new StatisticsService();
