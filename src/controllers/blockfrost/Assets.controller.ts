import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import stringToHex from "../../helpers/convertHex";
import apiBlockfrost from "../../utils/blockfrost";

class AssetsController {
    async getAllAssetsFromAddress(request: Request, response: Response) {
        const { stakeAddress } = request.body;
        const data = await apiBlockfrost.accountsAddressesAssets(stakeAddress);
        response.status(StatusCodes.OK).json(data);
    }

    /**
     * @description GET INFORMATION ASSETS
     * @param request { body: { assetName: require, policyId: require } }
     * @param response
     * @return
     */
    async getAllInformationAssets(request: Request, response: Response) {
        try {
            const { policyId, assetName } = request.body;

            if (!policyId || !assetName) {
                return response.status(StatusCodes.BAD_REQUEST).json({
                    message: "",
                });
            }

            const data = await apiBlockfrost.assetsById(policyId + assetName);
            response.status(StatusCodes.OK).json(data);
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error,
            });
        }
    }

    async getMintedAssets(request: Request, response: Response) {
        const { policyId } = request.body;

        const data = await apiBlockfrost.assetsPolicyById(policyId);
        response.status(StatusCodes.OK).json(data);
    }
}

export default new AssetsController();
