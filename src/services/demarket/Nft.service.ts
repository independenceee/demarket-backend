import prisma, { Nft } from "../../models";
import { ApiError } from "../../errors";
import generics from "../../constants/generics";
import { StatusNft } from "@prisma/client";

class NftService {
    async findAllNfts(page: number): Promise<Nft[]> {
        try {
            const PER_PAGE = generics.PER_PAGE;
            const currentPage = Math.max(Number(page || 1), 1);
            const nfts: Nft[] = await prisma.nft.findMany({ take: PER_PAGE, skip: (currentPage - 1) * PER_PAGE });
            return nfts;
        } catch (error) {
            throw new ApiError(error);
        } finally {
            await prisma.$disconnect();
        }
    }

    async findNftByPolicyIdAndAssetName({ policyId, assetName }: { policyId: string; assetName: string }): Promise<Nft | null> {
        try {
            const nft: Nft | null = await prisma.nft.findFirst({ where: { policyId: policyId, assetName: assetName } });
            return nft;
        } catch (error) {
            throw new ApiError(error);
        } finally {
            await prisma.$disconnect();
        }
    }

    async findNftById(id: string): Promise<Nft | null> {
        try {
            const nft: Nft | null = await prisma.nft.findFirst({ where: { id: id } });
            return nft;
        } catch (error) {
            throw new ApiError(error);
        } finally {
            await prisma.$disconnect();
        }
    }

    async findNftsByCartId({ cartId, page, pageSize }: { cartId: string; page: number; pageSize: number }) {
        try {
            const currentPage = Math.max(Number(page || 1), 1);
            const cartNfts = await prisma.cartNft.findMany({
                where: { cart: { id: cartId } },
                include: { nft: true },
                take: pageSize,
                skip: (currentPage - 1) * pageSize,
            });
            const nfts = cartNfts.map((cartNft) => cartNft.nft);
            const totalPage = Math.ceil(nfts.length / pageSize);
            return { totalPage, nfts };
        } catch (error) {
            throw new ApiError(error);
        } finally {
            await prisma.$disconnect();
        }
    }

    async findNftsCartByWalletAddress({ walletAddress, page, pageSize }: { walletAddress: string; page: number; pageSize: number }) {
        try {
            const currentPage = Math.max(Number(page || 1), 1);
            const account = await prisma.account.findUnique({ where: { walletAddress }, include: { cart: true } });
            if (!account || !account.cart) return { totalPage: 0, nfts: [] };
            const cartNfts = await prisma.cartNft.findMany({
                where: { cart: { id: account.cart.id } },
                include: { nft: true },
                take: pageSize,
                skip: (currentPage - 1) * pageSize,
            });
            const nfts = cartNfts.map((cartNft) => cartNft.nft);
            const totalPage = Math.ceil(nfts.length / pageSize);
            return { totalPage, nfts };
        } catch (error) {
            throw new ApiError(error);
        } finally {
            await prisma.$disconnect();
        }
    }

    async createNft({ policyId, assetName, status }: { policyId: string; assetName: string; status: StatusNft }) {
        try {
            const nft = await prisma.nft.create({
                data: { status: status == "SELLING" ? status : "SOLDOUT", policyId: policyId, assetName: assetName },
            });
            return nft;
        } catch (error) {
            throw new ApiError(error);
        } finally {
            await prisma.$disconnect();
        }
    }

    async updateNft(
        { status, transaction, policyId, assetName }: { status: StatusNft; transaction: string; policyId: string; assetName: string },
        existNft: Nft,
    ) {
        try {
            await prisma.nft.update({
                where: { policyId: policyId, assetName: assetName },
                data: {
                    status: status ? status : existNft.status,
                    countOfTransaction: transaction ? Number(existNft.countOfTransaction) + 1 : existNft.countOfTransaction,
                },
            });
        } catch (error) {
            throw new ApiError(error);
        } finally {
            await prisma.$disconnect();
        }
    }

    async deleteNft({ policyId, assetName }: { policyId: string; assetName: string }) {
        try {
            await prisma.nft.delete({ where: { policyId: policyId, assetName: assetName } });
        } catch (error) {
            throw new ApiError(error);
        } finally {
            await prisma.$disconnect();
        }
    }

    async searchNfts(query: string) {
        try {
            const nfts = await prisma.nft.findMany({
                where: { OR: [{ policyId: { contains: query, mode: "insensitive" } }, { assetName: { contains: query, mode: "insensitive" } }] },
            });
            return nfts;
        } catch (error) {
            throw new ApiError(error);
        } finally {
            await prisma.$disconnect();
        }
    }
}

export default new NftService();
