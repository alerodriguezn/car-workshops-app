"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createNewRepair = async (formData: FormData) => {

  const rawData = {
    appointmentId: formData.get("appointmentId"),
    mechanicId: formData.get("managerId"),
    diagnosis: formData.get("diagnosis"),
    vehicleId: formData.get("vehicleId"),
  };

  console.log(rawData);

  const vehicleId = parseInt(rawData.vehicleId as string);
  const mechanicId = parseInt(rawData.mechanicId as string);
  const appointmentId = parseInt(rawData.appointmentId as string);
  const diagnosis = rawData.diagnosis as string;

  try {
    const newRepair = await prisma.repairs.create({
      data: {
        appointmentId,
        managerId: mechanicId,
        diagnosis,
        vehicleId,
        ApprovedByCliente: false,
      },
     
    });

    if (!newRepair) {
      throw new Error("Error creating new repair");
    }

    revalidatePath("/admin/appointments/manage/[id]", "page");

    return newRepair;

  } catch (error) {
    console.error(error);
  }
};
