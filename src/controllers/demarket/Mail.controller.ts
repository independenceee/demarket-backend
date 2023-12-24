import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import mailService from "../../services/demarket/Mail.service";
import { InternalServerError } from "../../errors";

class MailController {
    /**
     * @method POST => DONE
     * @description Send feedback to email
     * @param request 
     * @param response 
     * @returns 
     */
    async sendMail(request: Request, response: Response) {
        try {
            const { emailFrom, feedback } = request.body;
            if (!emailFrom && !feedback) {
                return response.status(StatusCodes.BAD_REQUEST).json({
                    message: "email, feedback has been required !",
                });
            }
            await mailService.sendMail({ emailFrom, feedback });
            response.status(StatusCodes.OK).json({
                message: "Send feedback successfully !",
            });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError(error));
        }
    }
}

export default new MailController();
