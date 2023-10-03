import {
    PrismaClient,
    Cart,
    Category,
    Blog,
    Account,
    NFT,
    Collection,
    Founder,
    Guide,
    Statistics,
} from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
export { Account, Guide, Founder, Statistics, NFT, Collection, Category, Cart };
