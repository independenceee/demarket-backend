import prisma, { Nft } from "../../models";
import { ApiError } from "../../errors";
import generics from "../../constants/generics";
import { StatusNft } from "@prisma/client";

class NftService {
    async findAllNfts(page: number): Promise<Nft[] | null> {
        try {
            const PER_PAGE = generics.PER_PAGE;
            const currentPage = Math.max(Number(page || 1), 1);

            const nfts = await prisma.nft.findMany({
                take: PER_PAGE,
                skip: (currentPage - 1) * PER_PAGE,
            });

            if (nfts) {
                return nfts;
            }
        } catch (error) {
            throw new ApiError(error);
        }

        return null;
    }

    async findNftByPolicyIdAndAssetName({ policyId, assetName }: { policyId: string; assetName: string }): Promise<Nft | null> {
        try {
            const nft = await prisma.nft.findFirst({ where: { policyId: policyId, assetName: assetName } });
            if (nft) {
                return nft;
            }
        } catch (error) {
            throw new ApiError(error);
        }

        return null;
    }

    async findNftById(id: string): Promise<Nft | null> {
        try {
            const nft = await prisma.nft.findFirst({ where: { id: id } });
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
}

export default new NftService();
