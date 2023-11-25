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
            const accountsFollowed = following.map(function (follow) {
                return follow.following;
            });
            const totalPage = accountsFollowed.length;
            return { accountsFollowed, totalPage };
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
            const accountsFollowing = following.map(function (follow) {
                return follow.follower;
            });
            const totalPage = accountsFollowing.length;
            return { accountsFollowing, totalPage };
        } catch (error) {
            throw new ApiError(error);
        } finally {
            await prisma.$disconnect();
        }
    }
}

export default new FollowService();
