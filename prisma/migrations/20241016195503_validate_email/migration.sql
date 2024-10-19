/*
  Warnings:

  - You are about to drop the column `enabled` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "enabled",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "ActiveToken" (
    "idAuto" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "activatedAt" TIMESTAMP(3),
    "profileId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActiveToken_pkey" PRIMARY KEY ("idAuto")
);

-- CreateIndex
CREATE UNIQUE INDEX "ActiveToken_id_key" ON "ActiveToken"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ActiveToken_token_key" ON "ActiveToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "ActiveToken_profileId_key" ON "ActiveToken"("profileId");

-- AddForeignKey
ALTER TABLE "ActiveToken" ADD CONSTRAINT "ActiveToken_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("idAuto") ON DELETE RESTRICT ON UPDATE CASCADE;
