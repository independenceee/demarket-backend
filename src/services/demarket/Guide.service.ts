import { ApiError } from "../../errors";
import prisma, { Guide } from "../../models";

class GuideService {
    async findGuideById(id: string): Promise<Guide | null> {
        try {
            const guide = await prisma.guide.findFirst({
                where: {
                    id: id,
                },
            });

            if (guide) {
                return guide;
            }
        } catch (error) {
            throw new ApiError(error);
        }

        return null;
    }
}

export default new GuideService();
