import { Router } from "express";
import UploadFile from "../../middlewares/Upload";
import accountController from "../../controllers/demarket/Account.controller";

const router = Router();

router.route("/").get(accountController.getAllAccounts);
router.route("/:id").get(accountController.getAccountById);
router.route("/").post(accountController.createAccount);
router.route("/:id").patch(
    UploadFile.fields([
        { name: "avatar", maxCount: 1 },
        { name: "cover", maxCount: 1 },
    ]),
    accountController.updateAccountById,
);
router.route("/:id").delete(accountController.deleteAccountById);

export default router;
