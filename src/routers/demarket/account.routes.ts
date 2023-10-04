import { Router } from "express";
import UploadFile from "../../middlewares/Upload";
import AccountController from "../../controllers/demarket/Account.controller";

const router = Router();

router.route("/").post(
    UploadFile.fields([
        { name: "avatar", maxCount: 1 },
        { name: "cover", maxCount: 1 },
    ]),
    AccountController.createAccount,
);
router.route("/:id").patch(AccountController.updateAccountById);

export default router;
