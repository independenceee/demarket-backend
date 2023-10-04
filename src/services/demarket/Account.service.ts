import { ApiError } from "../../errors";
import prisma, { Account } from "../../models";

class AccountService {
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

    async findAccountByAddress(address: string | any): Promise<Account | null> {
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
