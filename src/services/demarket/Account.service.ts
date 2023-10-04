import generics from "../../constants/generics";
import { ApiError } from "../../errors";
import prisma, { Account } from "../../models";

class AccountService {
    async findAllAccounts(page: number): Promise<Account[] | null> {
        try {
            const PER_PAGE = generics.PER_PAGE;
            const currentPage = Math.max(Number(page || 1), 1);
            const account = await prisma.account.findMany({
                take: PER_PAGE,
                skip: (currentPage - 1) * PER_PAGE,
            });

            if (account) {
                return account;
            }
        } catch (error) {
            throw new ApiError(error);
        }

        return null;
    }
    async findAccountById(id: string | any): Promise<Account | null> {
        try {
            const account = await prisma.account.findFirst({
                where: {
                    id: id,
                },
            });

            if (account) {
                return account;
            }
        } catch (error) {
            throw new ApiError(error);
        }

        return null;
    }

    async checkDuplicateAccount(address: string | any): Promise<Account | null> {
        try {
            const account = await prisma.account.findFirst({
                where: {
                    address: address,
                },
            });

            if (account) {
                return account;
            }
        } catch (error) {
            throw new ApiError(error);
        }

        return null;
    }
}

export default new AccountService();
