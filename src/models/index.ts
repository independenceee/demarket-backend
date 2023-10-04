import {
    PrismaClient,
    Cart,
    Category,
    Blog,
    Account,
    Nft,
    Collection,
    Founder,
    Guide,
    Statistics,
} from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
export { Account, Guide, Founder, Statistics, Nft, Collection, Category, Cart };
