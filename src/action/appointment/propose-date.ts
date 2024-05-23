"use server";
import prisma from "@/lib/prisma";

export const proposeDate = async (id: number, date: Date) => {
  try {
    const updatedAppointment = await prisma.appointment.update({
      where: {
        id,
      },
      data: {
        date: date,
        status: "Created",
      },
    });

    if (!updatedAppointment) {
      throw new Error("Appointment not found");
    }


    return updatedAppointment;

  } catch (error) {
    console.error(error);	
  }
};
