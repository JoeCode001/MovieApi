/*
  Warnings:

  - You are about to drop the column `postedUrl` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `Status` on the `WatchlistItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,movieId]` on the table `WatchlistItem` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "postedUrl",
ADD COLUMN     "posterUrl" TEXT;

-- AlterTable
ALTER TABLE "WatchlistItem" DROP COLUMN "Status",
ADD COLUMN     "status" "WatchlistStatus" NOT NULL DEFAULT 'PLANNED';

-- CreateIndex
CREATE UNIQUE INDEX "WatchlistItem_userId_movieId_key" ON "WatchlistItem"("userId", "movieId");
