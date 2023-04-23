/*
  Warnings:

  - Added the required column `specialty` to the `Medic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Medic" ADD COLUMN     "specialty" VARCHAR(100) NOT NULL;
