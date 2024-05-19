import prisma from "../lib/prisma";
import { initialData } from "./seed";

async function main() {
  await prisma.appointment.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.client.deleteMany();
  await prisma.mechanic.deleteMany();
  await prisma.workshop.deleteMany();

  const { workshops } = initialData;

  await prisma.workshop.createMany({
    data: workshops,
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
