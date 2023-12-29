import prisma from "../../models";
import { ApiError } from "../../errors";

class LikeService {
    async checkLikeExist({ nftId, accountId }: { nftId: string; accountId: string }) {
        try {
            const existedLike = await prisma.likes.findUnique({
                where: {
                    accountId_nftId: {
                        accountId: accountId,
                        nftId: nftId,
                    },
                },
            });
            return existedLike;
        } catch (error) {
            throw new ApiError(error);
        } finally {
            await prisma.$disconnect();
        }
    }

    async createLikeNftFromAccount({ nftId, accountId }: { nftId: string; accountId: string }) {
        try {
            await prisma.likes.create({
                data: {
                    accountId: accountId,
                    nftId: nftId,
                },
            });
        } catch (error) {
            throw new ApiError(error);
        } finally {
            await prisma.$disconnect();
        }
    }

    async deleteLikeNftFromAccount({ nftId, accountId }: { nftId: string; accountId: string }) {
        try {
            await prisma.likes.delete({
                where: {
                    accountId_nftId: {
                        accountId: accountId,
                        nftId: nftId,
                    },
                },
            });
        } catch (error) {
            throw new ApiError(error);
        } finally {
            await prisma.$disconnect();
        }
    }
}

export default new LikeService();
