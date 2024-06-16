"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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

    revalidatePath(`/admin.appointments/${id}`)


    return updatedAppointment;

  } catch (error) {
    console.error(error);	
  }
};
