import { ApiError } from "../../errors";
import prisma, { Founder } from "../../models";

class FounderService {
    /**
     * DONE
     * @description Find founder buy id from demarket database
     * @param { id }
     * @returns { founder | null}
     */
    async findFounderById(id: string): Promise<Founder | null> {
        try {
            const founder = await prisma.founder.findFirst({ where: { id: id } });
            return founder;
        } catch (error) {
            throw new ApiError(error);
        } finally {
            await prisma.$disconnect();
        }
    }

    /**
     * DONE
     * @description Find all founders from demarket
     * @param { page: number, pageSize: number}
     * @returns { totalPage: number, founders: Founder[]}
     */
    async findAllFounders({ page, pageSize }: { page: number; pageSize: number }): Promise<{ founders: Founder[]; totalPage: number }> {
        try {
            const currentPage = Math.max(Number(page || 1), 1);
            const totalFounders = await prisma.founder.count();
            const totalPage = Math.ceil(totalFounders / pageSize);
            const founders = await prisma.founder.findMany({ take: pageSize, skip: (currentPage - 1) * pageSize });
            return { founders, totalPage };
        } catch (error) {
            throw new ApiError(error);
        } finally {
            await prisma.$disconnect();
        }
    }

    async createFounder({ firstName, lastName, role, company, linkedin, twitter, telegram }: any, files: Express.Multer.File[] | any) {
        try {
            await prisma.founder.create({
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    role: role,
                    avatar: process.env.DOMAIN_NAME! + "/founder/" + files[0].filename,
                    company: company ? company : "BLOCKALPHA",
                    linkedin: linkedin ? linkedin : "",
                    twitter: twitter ? twitter : "",
                    telegram: telegram ? telegram : "",
                },
            });
        } catch (error) {
            throw new ApiError(error);
        } finally {
            await prisma.$disconnect();
        }
    }
}

export default new FounderService();
