import { PrismaClient } from '@prisma/client';
import { hash } from 'argon2';

const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const hashedPassword = await hash('attamed123');

  await prisma.user.upsert({
    where: { email: 'email@attamed.com' },
    update: {},
    create: {
      email: 'email@attamed.com',
      password: hashedPassword,
    },
  });

  await prisma.patient.upsert({
    where: { cpf: '48201786955' },
    update: {},
    create: {
      cpf: '48201786955',
      age: 24,
      name: 'Gabriel Ryan José Assis',
      gender: 'MALE'
    },
  });

  await prisma.patient.upsert({
    where: { cpf: '98091091052' },
    update: {},
    create: {
      cpf: '98091091052',
      age: 37,
      name: 'Sarah Teresinha Assunção',
    },
  });

  await prisma.medic.upsert({
    where: { crm: 'CRM/SP-123456' },
    update: {},
    create: {
      crm: 'CRM/SP-123456',
      name: 'Caleb Gabriel Almada',
      specialty: 'Cardiologia'
    },
  });

  await prisma.medic.upsert({
    where: { crm: 'CRM/SP-654321' },
    update: {},
    create: {
      crm: 'CRM/SP-654321',
      name: 'Sônia Hadassa Fátima',
      specialty: 'Neurologia'
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
