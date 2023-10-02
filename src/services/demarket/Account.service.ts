import { ApiError } from "../../errors";
import prisma, { Account } from "../../models";

class AccountService {
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
