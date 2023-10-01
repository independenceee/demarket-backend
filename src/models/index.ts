import {
    PrismaClient,
    Account,
    Blog,
    Cart,
    Category,
    CategoryCollection,
    Collection,
    Founder,
    Guide,
} from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
export { Account, Guide, Founder };
