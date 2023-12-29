import prisma from "../../models";
import { ApiError } from "../../errors";

class FollowService {
    async findAccountFollowedsByAccount({ accountId, page, pageSize }: { accountId: string; page: number; pageSize: number }) {
        try {
            const currentPage = Math.max(Number(page || 1), 1);
            const following = await prisma.follows.findMany({
                where: { followerId: accountId },
                include: { following: true },
                take: pageSize,
                skip: (currentPage - 1) * pageSize,
            });
            const accounts = following.map(function (follow) {
                return follow.following;
            });
            const totalPage = Math.ceil(accounts.length / pageSize);
            return { accounts, totalPage };
        } catch (error) {
            throw new ApiError(error);
        } finally {
            await prisma.$disconnect();
        }
    }

    async findAccountFollowingsByAccount({ accountId, page, pageSize }: { accountId: string; page: number; pageSize: number }) {
        try {
            const currentPage = Math.max(Number(page || 1), 1);
            const following = await prisma.follows.findMany({
                where: { followingId: accountId },
                include: { follower: true },
                take: pageSize,
                skip: (currentPage - 1) * pageSize,
            });
            const accounts = following.map(function (follow) {
                return follow.follower;
            });
            const totalPage = Math.ceil(accounts.length / pageSize);
            return { accounts, totalPage };
        } catch (error) {
            throw new ApiError(error);
        } finally {
            await prisma.$disconnect();
        }
    }

    async checkFollowExistAccount({ followingId, followerId }: { followingId: string; followerId: string }) {
        try {
            const existFollow = await prisma.follows.findUnique({
                where: {
                    followerId_followingId: {
                        followerId: followerId,
                        followingId: followingId,
                    },
                },
            });
            return existFollow;
        } catch (error) {
            throw new ApiError(error);
        } finally {
            await prisma.$disconnect();
        }
    }

    async createFollowAccount({ followingId, followerId }: { followingId: string; followerId: string }) {
        try {
            await prisma.follows.create({
                data: {
                    followerId: followerId,
                    followingId: followingId,
                },
            });
        } catch (error) {
            throw new ApiError(error);
        } finally {
            await prisma.$disconnect();
        }
    }

    async deleteFollowAccount({ followingId, followerId }: { followingId: string; followerId: string }) {
        try {
            await prisma.follows.delete({
                where: {
                    followerId_followingId: {
                        followerId: followerId,
                        followingId: followingId,
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

export default new FollowService();
