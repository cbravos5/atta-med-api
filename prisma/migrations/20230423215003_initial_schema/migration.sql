-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateTable
CREATE TABLE "Medic" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "crm" VARCHAR(13) NOT NULL,
    "specialty" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Medic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL DEFAULT 'OTHER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" UUID NOT NULL,
    "when" TIMESTAMP(3) NOT NULL,
    "isCacelled" BOOLEAN NOT NULL DEFAULT false,
    "patientId" UUID NOT NULL,
    "medicId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_medicId_fkey" FOREIGN KEY ("medicId") REFERENCES "Medic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
