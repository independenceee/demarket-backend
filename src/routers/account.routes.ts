import { Router } from "express";
import UploadFile from "../middlewares/Upload";
import AccountController from "../controllers/Account.controller";

const router = Router();

router.route("/").get(AccountController.getAllAccounts);
router
    .route("/")
    .post(
        UploadFile("account").single("file"),
        AccountController.createAccount,
    );
router.route("/:id").patch(AccountController.updateAccountById);
router.route("/:id").get(AccountController.getAccountById);
router.route("/:id").delete(AccountController.deleteAccountById);

export default router;
