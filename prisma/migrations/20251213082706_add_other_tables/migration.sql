-- CreateTable
CREATE TABLE "AmazonTraker" (
    "id" TEXT NOT NULL,
    "trakerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AmazonTraker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductLink" (
    "id" TEXT NOT NULL,
    "amazonTrakerId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LinkUseHistory" (
    "id" TEXT NOT NULL,
    "productLinkId" TEXT NOT NULL,
    "usedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LinkUseHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bio" TEXT,
    "twitter_id" TEXT,
    "instagram_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AmazonTraker_trakerId_key" ON "AmazonTraker"("trakerId");

-- CreateIndex
CREATE UNIQUE INDEX "AmazonTraker_userId_key" ON "AmazonTraker"("userId");

-- CreateIndex
CREATE INDEX "ProductLink_amazonTrakerId_idx" ON "ProductLink"("amazonTrakerId");

-- CreateIndex
CREATE INDEX "LinkUseHistory_productLinkId_idx" ON "LinkUseHistory"("productLinkId");

-- CreateIndex
CREATE UNIQUE INDEX "profile_userId_key" ON "profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "profile_twitter_id_key" ON "profile"("twitter_id");

-- CreateIndex
CREATE UNIQUE INDEX "profile_instagram_id_key" ON "profile"("instagram_id");

-- AddForeignKey
ALTER TABLE "AmazonTraker" ADD CONSTRAINT "AmazonTraker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductLink" ADD CONSTRAINT "ProductLink_amazonTrakerId_fkey" FOREIGN KEY ("amazonTrakerId") REFERENCES "AmazonTraker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkUseHistory" ADD CONSTRAINT "LinkUseHistory_productLinkId_fkey" FOREIGN KEY ("productLinkId") REFERENCES "ProductLink"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
