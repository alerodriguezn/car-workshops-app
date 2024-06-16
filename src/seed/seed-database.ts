import prisma from "../lib/prisma";
import { initialData } from "./seed";

async function main() {
    await prisma.invoiceDetail.deleteMany();
    await prisma.invoice.deleteMany();
    await prisma.repairDetails.deleteMany();
    await prisma.repairs.deleteMany();
    await prisma.appointmentMedia.deleteMany();
    await prisma.appointmentDetail.deleteMany();
    await prisma.appointment.deleteMany();
    await prisma.mechanic.deleteMany();
    await prisma.vehicle.deleteMany();
    await prisma.workshop.deleteMany();
    await prisma.client.deleteMany();
    await prisma.user.deleteMany();

  const { workshops, clients, users, vehicles, mechanics } = initialData;

  await prisma.user.createMany({
    data: users,
  })

  await prisma.workshop.createMany({
    data: workshops,
  });

  await prisma.client.createMany({
    data: clients,
  });

  await prisma.vehicle.createMany({
    data: vehicles
  })

  await prisma.mechanic.createMany({
    data: mechanics
  })



}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
