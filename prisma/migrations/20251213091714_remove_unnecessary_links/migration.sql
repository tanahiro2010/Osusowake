/*
  Warnings:

  - You are about to drop the column `userId` on the `LinkUseHistory` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `ProductLink` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "LinkUseHistory" DROP CONSTRAINT "LinkUseHistory_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProductLink" DROP CONSTRAINT "ProductLink_userId_fkey";

-- AlterTable
ALTER TABLE "LinkUseHistory" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "ProductLink" DROP COLUMN "userId";
