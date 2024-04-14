/*
  Warnings:

  - You are about to drop the column `skuAvailabilityDetailMap` on the `StyleOption` table. All the data in the column will be lost.
  - You are about to drop the column `warehouseIdToItemCountMap` on the `StyleOption` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StyleOption" DROP COLUMN "skuAvailabilityDetailMap",
DROP COLUMN "warehouseIdToItemCountMap";
