/*
  Warnings:

  - Added the required column `userId` to the `LinkUseHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ProductLink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LinkUseHistory" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductLink" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductLink" ADD CONSTRAINT "ProductLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkUseHistory" ADD CONSTRAINT "LinkUseHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
