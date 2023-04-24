/*
  Warnings:

  - You are about to drop the column `isCacelled` on the `Appointment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "isCacelled",
ADD COLUMN     "isCancelled" BOOLEAN NOT NULL DEFAULT false;
