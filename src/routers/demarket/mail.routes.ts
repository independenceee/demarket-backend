import { Router } from "express";
import mailController from "../../controllers/demarket/Mail.controller";

const router = Router();

router.route("/").post(mailController.sendMail);

export default router;
