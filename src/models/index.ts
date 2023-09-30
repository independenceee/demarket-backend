import { PrismaClient, Account } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
export { Account };
