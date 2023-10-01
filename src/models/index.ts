import {
    PrismaClient,
    Account,
    NFTCart,
    NFT,
    Cart,
    Category,
    CategoryCollection,
    Collection,
    Blog,
    Founder,
    Guide,
    Statistics,
} from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
export { Account, Guide, Founder, Statistics };
