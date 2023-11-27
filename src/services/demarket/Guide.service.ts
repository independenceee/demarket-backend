import { ApiError } from "../../errors";
import prisma, { Guide } from "../../models";

class GuideService {
    async findGuideById(id: string): Promise<Guide | null> {
        try {
            const guide: Guide | null = await prisma.guide.findFirst({ where: { id: id } });
            return guide;
        } catch (error) {
            throw new ApiError(error);
        } finally {
            await prisma.$disconnect();
        }
    }
}

export default new GuideService();
