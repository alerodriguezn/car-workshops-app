"use server";

import prisma from "@/lib/prisma";

export const getAllRepairsByAppointment = async (appointmentId: number) => {
  try {
    const allRepairs = await prisma.repairs.findMany({
      where: {
        appointmentId: appointmentId,
      },
    });

    if (!allRepairs) {
      throw new Error("Error getting repairs");
    }

    return allRepairs;
  } catch (error) {
    console.error(error);
  }
};
