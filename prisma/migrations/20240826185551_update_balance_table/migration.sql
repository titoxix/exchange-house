/*
  Warnings:

  - Made the column `usdAmount` on table `Balance` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pesosAmount` on table `Balance` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `state` on the `Balance` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "BalanceState" AS ENUM ('OPEN', 'CLOSED');

-- AlterTable
ALTER TABLE "Balance" ALTER COLUMN "usdAmount" SET NOT NULL,
ALTER COLUMN "pesosAmount" SET NOT NULL,
DROP COLUMN "state",
ADD COLUMN     "state" "BalanceState" NOT NULL;

-- DropEnum
DROP TYPE "CashAuditState";
