import prisma, { NFT } from "../../models";
import { ApiError } from "../../errors";

class NftService {
    async findAllNfts(page: number): Promise<NFT[] | null> {
        try {
            const PER_PAGE = 12;
            const currentPage = Math.max(Number(page || 1), 1);

            const nfts = await prisma.nFT.findMany({
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

    async findNftById(id: string): Promise<NFT | null> {
        try {
            const nft = await prisma.nFT.findFirst({
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
}

export default new NftService();
