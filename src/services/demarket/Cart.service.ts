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

    async findNftExistAccount({ nftId, cartId }: { nftId: string; cartId: string }) {
        try {
            const existingCartNft = await prisma.cartNft.findUnique({
                where: {
                    cartId_nftId: {
                        cartId: cartId,
                        nftId: nftId,
                    },
                },
            });

            return existingCartNft;
        } catch (error) {
            throw new ApiError(error);
        } finally {
            await prisma.$disconnect();
        }
    }

    async findCartByAccountId(accountId: string) {
        try {
            const cart = await prisma.cart.findUnique({ where: { accountId: String(accountId) } });
            return cart;
        } catch (error) {
            throw new ApiError(error);
        } finally {
            await prisma.$disconnect();
        }
    }

    async addNftToCart({ nftId, cartId }: { nftId: string; cartId: string }) {
        try {
            await prisma.cartNft.create({ data: { cartId: cartId, nftId: String(nftId) } });
        } catch (error) {
            throw new ApiError(error);
        } finally {
            await prisma.$disconnect();
        }
    }

    async removeNftFromCart({ nftId, cartId }: { nftId: string; cartId: string }) {
        try {
            await prisma.cartNft.delete({ where: { cartId_nftId: { cartId: cartId, nftId: String(nftId) } } });
        } catch (error) {
            throw new ApiError(error);
        } finally {
            await prisma.$disconnect();
        }
    }
}

export default new CartService();
