import { Request, Response } from "express";
import apiBlockfrost from "../../utils/blockfrost";
import stringToHex from "../../helpers/convertHex";
import { StatusCodes } from "http-status-codes";

class TransactionController {
    /**
     * @title GET DETAILS UTXOs BLOCK
     * @description 
     * @param request
     * @param response
     */
    async getUTXOsTransaction(request: Request, response: Response) {
        const { transactionHash } = request.body;

        const data = await apiBlockfrost.txsUtxos(transactionHash);
        response.status(StatusCodes.OK).json(data);
    }

    /**
     * @description GET DETAILS TRANSACTION BLOCK
     * @param request
     * @param response
     */
    async getDetailsTransactions(request: Request, response: Response) {
        const { transactionHash } = request.body;

        const data = await apiBlockfrost.txs(transactionHash);
        response.status(StatusCodes.OK).json(data);
    }

    /**
     * @description GET TRANSACTION ACCOUNT
     * @param request
     * @param response
     */
    async getTransactionAccount(request: Request, response: Response) {
        const { address } = request.body;
        const data = await apiBlockfrost.addressesTransactions(address);
        response.status(StatusCodes.OK).json(data);
    }

    /**
     * @description GET TRANSACTION ASSET
     * @param request
     * @param response
     */
    async getTransactionAsset(request: Request, response: Response) {
        const { policyId, assetName } = request.body;

        if (!policyId && !assetName) {
            return response.status(StatusCodes.BAD_REQUEST).json({
                message: "PolicyId and assetName is required",
            });
        }

        const assetHex = stringToHex(assetName);
        const data = await apiBlockfrost.assetsTransactions(policyId + assetHex);
        response.status(StatusCodes.OK).json(data);
    }
}

export default new TransactionController();
