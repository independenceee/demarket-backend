-- CreateEnum
CREATE TYPE "StatusNft" AS ENUM ('SOLDOUT', 'COMMINGSOON', 'SELLING');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "policyId" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "cover" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "followed" INTEGER NOT NULL DEFAULT 0,
    "validate" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "avatar" TEXT,
    "cover" TEXT,
    "url" TEXT,
    "accoutnId" TEXT NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryCollection" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,

    CONSTRAINT "CategoryCollection_pkey" PRIMARY KEY ("categoryId","collectionId")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NFT" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "validate" BOOLEAN NOT NULL DEFAULT false,
    "policyId" TEXT NOT NULL,
    "assetName" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,
    "totalTransaction" BIGINT NOT NULL DEFAULT 0,
    "status" "StatusNft" NOT NULL,
    "countOfTransaction" INTEGER DEFAULT 0,

    CONSTRAINT "NFT_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NFTCart" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cartId" TEXT NOT NULL,
    "nftId" TEXT NOT NULL,

    CONSTRAINT "NFTCart_pkey" PRIMARY KEY ("nftId","cartId")
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "policyId" TEXT NOT NULL,
    "assetName" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialMedia" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "founderId" TEXT NOT NULL,

    CONSTRAINT "SocialMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guide" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "question" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Guide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Statitics" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "totalProduct" BIGINT NOT NULL DEFAULT 0,
    "totalCollection" BIGINT NOT NULL DEFAULT 0,
    "totalTrending" BIGINT NOT NULL DEFAULT 0,
    "totalAuthor" BIGINT NOT NULL DEFAULT 0,

    CONSTRAINT "Statitics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Founder" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fistName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "company" TEXT NOT NULL DEFAULT 'BLOCKALPHA',

    CONSTRAINT "Founder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_policyId_key" ON "Account"("policyId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_address_key" ON "Account"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "NFT_policyId_key" ON "NFT"("policyId");

-- CreateIndex
CREATE UNIQUE INDEX "NFT_assetName_key" ON "NFT"("assetName");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_policyId_key" ON "Cart"("policyId");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_assetName_key" ON "Cart"("assetName");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_accountId_key" ON "Cart"("accountId");

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_accoutnId_fkey" FOREIGN KEY ("accoutnId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryCollection" ADD CONSTRAINT "CategoryCollection_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryCollection" ADD CONSTRAINT "CategoryCollection_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NFT" ADD CONSTRAINT "NFT_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NFTCart" ADD CONSTRAINT "NFTCart_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NFTCart" ADD CONSTRAINT "NFTCart_nftId_fkey" FOREIGN KEY ("nftId") REFERENCES "NFT"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialMedia" ADD CONSTRAINT "SocialMedia_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialMedia" ADD CONSTRAINT "SocialMedia_founderId_fkey" FOREIGN KEY ("founderId") REFERENCES "Founder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
