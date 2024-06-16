"use server";

import prisma from "@/lib/prisma";

export const generateInvoice = async (appointmentId: number) => {
  const repairs = await prisma.repairs.findMany({
    where: {
      appointmentId: appointmentId,
    },
    select: {
      repairsDetail: {
        select: {
          id: true,
          description: true,
          cost: true,
        },
      },
    },
  });

  const newInvoiceServices = repairs.map((repair) => ({
    idAppointment: appointmentId,
    description: repair.repairsDetail!.description,
    cost: repair.repairsDetail!.cost,
    repairId: repair.repairsDetail!.id,
  }));

  console.log("App", appointmentId);

  const newInvoice = await prisma.invoice.create(
    {
      data: {
        idAppointment: appointmentId,
        total: 0,
      },
    }
  );

  newInvoiceServices.forEach(async (service) => {
    await prisma.invoiceDetail.create({
      data: {
        invoiceId: newInvoice.id,
        repairDetailId: service.repairId,
      },
    });
  });

  const total = newInvoiceServices.reduce(
    (acc, service) => acc + service.cost,
    0
  );

  await prisma.invoice.update({
    where: {
      id: newInvoice.id,
    },
    data: {
      total,
    },
  });

  return repairs;
};
