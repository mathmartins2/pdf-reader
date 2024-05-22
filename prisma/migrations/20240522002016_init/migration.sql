/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_code_key" ON "Invoice"("code");
