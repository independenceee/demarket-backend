import transporter from "../../utils/mail";

class MailService {
    async sendMail({ emailFrom, feedback }: { emailFrom: string; feedback: string }) {
        try {
            await transporter.sendMail({
                from: emailFrom,
                to: process.env.MAIL_COMPANY!,
                subject: "FEEDBACK DEMARKET",
                html: `<b>${feedback}</b>`,
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export default new MailService();
