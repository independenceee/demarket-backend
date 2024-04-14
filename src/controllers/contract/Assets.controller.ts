import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequest, NotFound } from "../../errors";
import { post } from "../../utils/koios";
import paginate from "../../utils/paginate";
import apiBlockfrost from "../../utils/blockfrost";

class Contract {
    async getAllAssetsFromContract(request: Request, response: Response) {
        const { address } = request.body;

        if (!address) return response.status(StatusCodes.BAD_REQUEST).json(new BadRequest("Address has been required."));
        const results = await post("/address_assets", { _addresses: [address] });

        const assets = await Promise.all(
            results.map(async function (result: any) {
                return {
                    policyId: result.policy_id,
                    assetName: result.asset_name,
                };
            }),
        );

        const metadata = await Promise.all(
            assets.map(async function (result: any) {
                const data = await apiBlockfrost.assetsById(result.policyId + result.assetName);
                return data;
            }),
        );

        response.status(StatusCodes.OK).json({
            totalPage: 0,
            data: metadata,
        });
    }
}

export default new Contract();
