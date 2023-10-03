import { ApiError } from "../../errors";
import prisma from "../../models";

class CartService {
    async getCartByAccountId(accountId: string) {
        try {
        } catch (error) {
            throw new ApiError(error);
        }
    }

    async createCartByAccountId(accountId: string) {
        try {
            await prisma.cart.create({
                data: {
                    accountId: accountId,
                },
            });
        } catch (error) {
            throw new ApiError(error);
        }
    }
}

export default new CartService();
