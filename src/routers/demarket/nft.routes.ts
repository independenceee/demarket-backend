import { Router } from "express";
import nftController from "../../controllers/demarket/Nft.controller";
const router = Router();

router.route("/search").get(nftController.searchNfts);
router.route("/like").get(nftController.getAllNftsLike);
router.route("/cart").get(nftController.getNftsFromCart);
router.route("/").get(nftController.getAllNfts);
router.route("/").post(nftController.createNft);
router.route("/:id").get(nftController.getNftById);
router.route("/:id").patch(nftController.updateNftById);
router.route("/:id").delete(nftController.deleteNftById);

export default router;
