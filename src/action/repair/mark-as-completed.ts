"use server";

import prisma from "@/lib/prisma";

export const markAsCompleted = async (
  repairdId: number,
  appointmentId: number
) => {
  const repair = await prisma.repairs.update({
    where: {
      id: repairdId,
    },
    data: {
      repairStatus: "Completed",
    },
  });

  //check if all the repairs are completed
  const repairs = await prisma.repairs.findMany({
    where: {
      appointmentId: appointmentId,
    },
  });

  if (!repairs) {
    return Response.json({ message: "Repairs not found" });
  }

  const isAllRepairsCompleted = repairs.every(
    (repair) => repair.repairStatus === "Completed"
  );

  if (isAllRepairsCompleted) {
    await prisma.appointment.update({
      where: {
        id: appointmentId,
      },
      data: {
        status: "Completed",
      },
    });
  }

  return repair;
};
