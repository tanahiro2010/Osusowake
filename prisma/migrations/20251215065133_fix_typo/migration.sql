/*
  Warnings:

  - You are about to drop the column `trakerId` on the `AmazonTraker` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[trackerId]` on the table `AmazonTraker` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `trackerId` to the `AmazonTraker` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "AmazonTraker_trakerId_key";

-- AlterTable
ALTER TABLE "AmazonTraker" DROP COLUMN "trakerId",
ADD COLUMN     "trackerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AmazonTraker_trackerId_key" ON "AmazonTraker"("trackerId");
