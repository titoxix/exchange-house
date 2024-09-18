/*
  Warnings:

  - A unique constraint covering the columns `[loginName]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `loginName` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'SUPER_ADMIN';

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "loginName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_loginName_key" ON "Profile"("loginName");
