/*
  Warnings:

  - You are about to drop the `CashAudits` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `balanceId` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "balanceId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "CashAudits";

-- CreateTable
CREATE TABLE "Balance" (
    "idAuto" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "usdInitialAmount" DOUBLE PRECISION NOT NULL,
    "pesosInitialAmount" DOUBLE PRECISION NOT NULL,
    "usdAmount" DOUBLE PRECISION,
    "pesosAmount" DOUBLE PRECISION,
    "state" "CashAuditState" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Balance_pkey" PRIMARY KEY ("idAuto")
);

-- CreateIndex
CREATE UNIQUE INDEX "Balance_id_key" ON "Balance"("id");

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_balanceId_fkey" FOREIGN KEY ("balanceId") REFERENCES "Balance"("idAuto") ON DELETE RESTRICT ON UPDATE CASCADE;
