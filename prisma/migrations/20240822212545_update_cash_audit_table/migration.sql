/*
  Warnings:

  - Added the required column `state` to the `CashAudits` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CashAuditState" AS ENUM ('OPEN', 'CLOSED');

-- AlterTable
ALTER TABLE "CashAudits" ADD COLUMN     "state" "CashAuditState" NOT NULL;
