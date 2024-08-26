/*
  Warnings:

  - Made the column `usdAmount` on table `Orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pesoAmount` on table `Orders` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Orders" ALTER COLUMN "usdAmount" SET NOT NULL,
ALTER COLUMN "pesoAmount" SET NOT NULL;
