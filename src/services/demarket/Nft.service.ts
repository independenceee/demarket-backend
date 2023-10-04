import prisma, { Nft } from "../../models";
import { ApiError } from "../../errors";
import generics from "../../constants/generics";

class NftService {
    async findAllNfts(page: number): Promise<Nft[] | null> {
        try {
            const PER_PAGE = generics.PER_PAGE;
            const currentPage = Math.max(Number(page || 1), 1);

            const nfts = await prisma.nft.findMany({
                take: PER_PAGE,
                skip: (currentPage - 1) * PER_PAGE,
                orderBy: {
                    createdAt: "desc",
                    updatedAt: "desc",
                },
            });

            if (nfts) {
                return nfts;
            }
        } catch (error) {
            throw new ApiError(error);
        }

        return null;
    }

    async findNftById(id: string): Promise<Nft | null> {
        try {
            const nft = await prisma.nft.findFirst({
                where: {
                    id: id,
                },
            });
            if (nft) {
                return nft;
            }
        } catch (error) {
            throw new ApiError(error);
        }

        return null;
    }

    async findNftByPolicyIdAndAssetName(policyId: string, assetName: string) {
        try {
            const nft = await prisma.nft.findFirst({
                where: {
                    policyId: policyId,
                    assetName: assetName,
                },
            });
            if (nft) {
                return nft;
            }
        } catch (error) {
            throw new ApiError(error);
        }

        return null;
    }
}

export default new NftService();
