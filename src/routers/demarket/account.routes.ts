import { Router } from "express";
import UploadFile from "../../middlewares/Upload";
import accountController from "../../controllers/demarket/Account.controller";

const router = Router();

router.route("/search").get(accountController.searchAccounts);
router.route("/followed").get(accountController.getAllAccountFollowers);
router.route("/following").get(accountController.getAllAccountFollowings);
router.route("/").get(accountController.getAllAccounts);
router.route("/:id").get(accountController.getAccountById);
router.route("/").post(accountController.createAccount);
router.route("/:id").patch(accountController.updateAccountById);
router.route("/:id").delete(accountController.deleteAccountById);

export default router;
