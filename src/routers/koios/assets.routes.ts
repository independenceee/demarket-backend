import { Router } from "express";
import assetsController from "../../controllers/koios/Assets.controller";

const router = Router();

router.route("/nft-address").post(assetsController.assetNftAddress);
router.route("/information").post(assetsController.assetInfomation);
router.route("/policy-information").post(assetsController.policyAssetInfomation);
router.route("/policy-infomation").post(assetsController.assetPolicyInfomation);
router.route("/summary").post(assetsController.assetSummary);
router.route("/policy-list").post(assetsController.policyAssetList);

export default router;
