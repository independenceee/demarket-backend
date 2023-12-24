import { ApiError } from "../../errors";
import prisma from "../../models";

class CartService {
    async createCartByAccountId(accountId: string) {
        try {
            const cart = await prisma.cart.create({ data: { accountId: accountId } });
            return cart;
        } catch (error) {
            throw new ApiError(error);
        }
    }
}

export default new CartService();
