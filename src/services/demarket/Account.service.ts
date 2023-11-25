import { ApiError } from "../../errors";
import prisma, { Account } from "../../models";

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

    async checkDuplicateAccount(address: string | any): Promise<any | null> {
        try {
            const account = await prisma.account.findFirst({
                where: { address: address },
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

    async createAccount({
        address,
        email,
        name,
        description,
        linkedin,
        telegram,
        twitter,
    }: {
        address: string;
        email: string;
        name: string;
        description: string;
        linkedin: string;
        telegram: string;
        twitter: string;
    }): Promise<Account> {
        try {
            const account = await prisma.account.create({
                data: {
                    name: name ? name : "",
                    address: address,
                    avatar: "",
                    cover: "",
                    description: description ? description : "",
                    email: email ? email : "",
                    linkedin: linkedin ? linkedin : "",
                    telegram: telegram ? telegram : "",
                    twitter: twitter ? twitter : "",
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
        name,
        description,
        linkedin,
        telegram,
        twitter,
    }: {
        files: any;
        existAccount: Account;
        id: string;
        email: string;
        name: string;
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
                avatar: "files ? files.avatar[0].filename : existAccount.avatar",
                cover: "files ? files.cover[0].filename : existAccount.cover",
                description: description ? description : existAccount.description,
                email: email ? email : existAccount.email,
                name: name ? name : existAccount.name,

                linkedin: linkedin ? linkedin : "",
                telegram: telegram ? telegram : "",
                twitter: twitter ? twitter : "",
            },
        });
    }
}

export default new AccountService();
