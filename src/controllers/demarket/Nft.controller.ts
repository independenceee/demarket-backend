import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { InternalServerError, NotFound } from "../../errors";

import nftService from "../../services/demarket/Nft.service";
import generics from "../../constants/generics";

class NftController {
    /**
     * @method GET => DONE
     * @description Get all nft from demarket
     * @param request
     * @param response
     */
    async getAllNfts(request: Request, response: Response) {
        try {
            const { page } = request.query;
            const nfts = await nftService.findAllNfts(Number(page));
            response.status(StatusCodes.OK).json(nfts);
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }

    
    async searchNfts(request: Request, response: Response) {
        try {
            const { query } = request.query;
            if (!query) return response.status(StatusCodes.NOT_FOUND).json(new NotFound("Query has been required"));
            const nfts = await nftService.searchNfts(String(query));
            response.status(StatusCodes.OK).json(nfts);
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }

    /**
     * @method GET => DONE
     * @description Get all nft from cartId
     * @param request
     * @param response
     */
    async getNftsFromCart(request: Request, response: Response) {
        try {
            const { walletAddress, page, pageSize } = request.query;
            const nfts = await nftService.findNftsCartByWalletAddress({
                page: Number(page),
                pageSize: Number(pageSize || generics.PER_PAGE),
                walletAddress: String(walletAddress),
            });

            response.status(StatusCodes.OK).json({ ...nfts });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }

    /**
     * @method GET => DONE
     * @param request
     * @param response
     * @returns
     */

    async getNftById(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const nft = await nftService.findNftById(id);
            if (nft) return response.status(StatusCodes.NOT_FOUND).json(new NotFound("Nft is not found."));
            response.status(StatusCodes.OK).json(nft);
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }

    /**
     * @method GET => DONE
     * @param request
     * @param response
     * @returns
     */
    async getNftByPolicyIdAndAssetName(request: Request, response: Response) {
        try {
            const { policyId, assetName } = request.query;
            const nft = await nftService.findNftByPolicyIdAndAssetName({ policyId: String(policyId), assetName: String(assetName) });
            if (!nft) return response.status(StatusCodes.OK).json(nft);
            response.status(StatusCodes.OK).json(nft);
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }

    /**
     * @method GET => DONE
     * @param request
     * @param response
     * @returns
     */
    async createNft(request: Request, response: Response) {
        try {
            const { policyId, assetName, status } = request.body;
            const existNft = await nftService.findNftByPolicyIdAndAssetName({ policyId, assetName });
            if (existNft) return response.status(StatusCodes.OK).json({ ...existNft });
            const nft = await nftService.createNft({ policyId, assetName, status });
            response.status(StatusCodes.OK).json({ ...nft });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }
    /**
     * @method PATCH => DONE
     * @param request
     * @param response
     * @returns
     */
    async updateNftById(request: Request, response: Response) {
        try {
            const { status, transaction, policyId, assetName } = request.body;
            const existNft = await nftService.findNftByPolicyIdAndAssetName({ policyId, assetName });
            if (!existNft) return response.status(StatusCodes.NOT_FOUND).json(new NotFound("Nft is not found."));
            await nftService.updateNft({ status, transaction, policyId, assetName }, existNft);
            response.status(StatusCodes.OK).json({ message: "Update nft successfully." });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }

    /**
     * @method GET => DONE
     * @param request
     * @param response
     * @returns
     */
    async deleteNftById(request: Request, response: Response) {
        try {
            const { policyId, assetName } = request.body;
            const existNft = await nftService.findNftByPolicyIdAndAssetName({ policyId, assetName });
            if (!existNft) return response.status(StatusCodes.NOT_FOUND).json(new NotFound("Nft is not found."));
            await nftService.deleteNft({ policyId, assetName });
            response.status(StatusCodes.OK).json({ message: "delete nft successfully." });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }
}

export default new NftController();
