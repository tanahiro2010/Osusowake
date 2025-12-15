/*
  Warnings:

  - You are about to drop the column `amazonTrakerId` on the `ProductLink` table. All the data in the column will be lost.
  - You are about to drop the `AmazonTraker` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `AmazonTrackerId` to the `ProductLink` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AmazonTraker" DROP CONSTRAINT "AmazonTraker_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProductLink" DROP CONSTRAINT "ProductLink_amazonTrakerId_fkey";

-- DropIndex
DROP INDEX "ProductLink_amazonTrakerId_idx";

-- AlterTable
ALTER TABLE "ProductLink" DROP COLUMN "amazonTrakerId",
ADD COLUMN     "AmazonTrackerId" TEXT NOT NULL;

-- DropTable
DROP TABLE "AmazonTraker";

-- CreateTable
CREATE TABLE "AmazonTracker" (
    "id" TEXT NOT NULL,
    "trackerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AmazonTracker_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AmazonTracker_trackerId_key" ON "AmazonTracker"("trackerId");

-- CreateIndex
CREATE UNIQUE INDEX "AmazonTracker_userId_key" ON "AmazonTracker"("userId");

-- CreateIndex
CREATE INDEX "ProductLink_AmazonTrackerId_idx" ON "ProductLink"("AmazonTrackerId");

-- AddForeignKey
ALTER TABLE "AmazonTracker" ADD CONSTRAINT "AmazonTracker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductLink" ADD CONSTRAINT "ProductLink_AmazonTrackerId_fkey" FOREIGN KEY ("AmazonTrackerId") REFERENCES "AmazonTracker"("id") ON DELETE CASCADE ON UPDATE CASCADE;
