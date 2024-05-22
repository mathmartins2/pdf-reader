-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "clientNumber" BIGINT NOT NULL,
    "referenceMonth" TEXT NOT NULL,
    "electricEnergyQuantity" DOUBLE PRECISION,
    "electricEnergyValue" DOUBLE PRECISION,
    "electricSceeQuantity" DOUBLE PRECISION,
    "electricSceeValue" DOUBLE PRECISION,
    "electricCompensadaGdQuantity" DOUBLE PRECISION,
    "electricCompensadaGdValue" DOUBLE PRECISION,
    "contribIlumPublicaMunicipal" DOUBLE PRECISION,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Invoice_clientNumber_idx" ON "Invoice"("clientNumber");
