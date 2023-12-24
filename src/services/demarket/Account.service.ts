import { ApiError } from "../../errors";
import prisma, { Account } from "../../models";
import stakekeyService from "../emurgo/Stakekey.service";

class AccountService {
    async findAllAccounts({ page, pageSize }: { page: number; pageSize: number }): Promise<{ accounts: Account[]; totalPage: number }> {
        try {
            const currentPage = Math.max(Number(page || 1), 1);
            const totalAccounts = await prisma.account.count();
            const totalPage = Math.ceil(totalAccounts / pageSize);
            const accounts = await prisma.account.findMany({ take: pageSize, skip: (currentPage - 1) * pageSize });
            return { accounts, totalPage };
        } catch (error) {
            throw new ApiError(error);
        } finally {
            await prisma.$disconnect();
        }
    }

    async findOtherAccount({ walletAddress, page, pageSize }: { walletAddress: string; page: number; pageSize: number }) {
        try {
            const currentPage = Math.max(Number(page || 1), 1);
            const currentAccount = await prisma.account.findUnique({ where: { walletAddress: walletAddress } });
            if (!currentAccount) return [];
            const otherAccounts = await prisma.account.findMany({
                where: { walletAddress: { not: walletAddress }, followers: { none: { followerId: currentAccount.id } } },
                take: pageSize,
                skip: (currentPage - 1) * pageSize,
            });
            const followingIds = await prisma.follows.findMany({
                where: { followerId: currentAccount.id },
                select: { followingId: true },
            });
            const followingIdsSet = new Set(followingIds.map((entry) => entry.followingId));
            const accounts = otherAccounts.map((account) => ({
                ...account,
                isFollowed: followingIdsSet.has(account.id),
            }));
            const totalPage = Math.ceil(accounts.length / pageSize);
            return { accounts, totalPage };
        } catch (error) {
            throw new ApiError(error);
        } finally {
            await prisma.$disconnect();
        }
    }

    async findAccountByAddress(walletAddress: string) {
        try {
            return await prisma.account.findUnique({ where: { walletAddress: walletAddress } });
        } catch (error) {
            throw new ApiError(error);
        } finally {
            await prisma.$disconnect();
        }
    }

    async findAccountById(id: string | any): Promise<Account | null> {
        try {
            const account = await prisma.account.findFirst({ where: { id: id } });
            if (account) {
                return account;
            }
        } catch (error) {
            throw new ApiError(error);
        } finally {
            await prisma.$disconnect();
        }
        return null;
    }

    async checkDuplicateAccount(walletAddress: string | any): Promise<any | null> {
        try {
            const account = await prisma.account.findFirst({
                where: { walletAddress: walletAddress },
                include: { cart: true },
            });

            if (account) {
                const { cart, ...existAccountWithoutCart } = account;
                return { ...existAccountWithoutCart, cartId: cart?.id };
            }
        } catch (error) {
            throw new ApiError(error);
        } finally {
            await prisma.$disconnect();
        }

        return null;
    }

    async createAccount({ walletAddress }: { walletAddress: string }): Promise<Account> {
        try {
            const stakeKeyWalletAddress = await stakekeyService.convertStakeKeyFromAddress({ walletAddress: walletAddress });
            const account = await prisma.account.create({
                data: {
                    walletAddress: walletAddress,
                    stakeKey: stakeKeyWalletAddress,
                    userName: stakeKeyWalletAddress,
                },
            });

            return account;
        } catch (error) {
            throw new ApiError(error);
        } finally {
            await prisma.$disconnect();
        }
    }

    async deleteAccount(id: string) {
        try {
            await prisma.account.delete({ where: { id: id } });
        } catch (error) {
            throw new ApiError(error);
        } finally {
            await prisma.$disconnect();
        }
    }

    async updateAccount({
        files,
        existAccount,
        id,
        email,
        userName,
        description,
        linkedin,
        telegram,
        twitter,
    }: {
        files: any;
        existAccount: Account;
        id: string;
        email: string;
        userName: string;
        description: string;
        linkedin: string;
        telegram: string;
        twitter: string;
    }) {
        await prisma.account.update({
            where: {
                id: id,
            },
            data: {
                // avatar: "files ? files.avatar[0].filename : existAccount.avatar",
                // cover: "files ? files.cover[0].filename : existAccount.cover",
                avatar: "",
                cover: "",
                description: description ? description : existAccount.description,
                email: email ? email : existAccount.email,
                userName: userName ? userName : existAccount.userName,

                linkedin: linkedin ? linkedin : "",
                telegram: telegram ? telegram : "",
                twitter: twitter ? twitter : "",
            },
        });
    }

    async searchAccount(query: string) {
        try {
            const accounts = await prisma.account.findMany({
                where: { OR: [{ walletAddress: { contains: query } }, { email: { contains: query } }, { userName: { contains: query } }] },
            });
            return accounts;
        } catch (error) {
            throw new ApiError(error);
        } finally {
            await prisma.$disconnect();
        }
    }
}

export default new AccountService();
