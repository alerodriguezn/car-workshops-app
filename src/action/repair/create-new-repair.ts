"use server";

import { put } from '@vercel/blob';
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createNewRepair = async (formData: FormData) => {

  const rawData = {
    appointmentId: formData.get("appointmentId"),
    mechanicId: formData.get("managerId"),
    diagnosis: formData.get("diagnosis"),
    vehicleId: formData.get("vehicleId"),
    imageFile: formData.get("image") as File,
    cost: formData.get("cost"),
    description: formData.get("description"),
    isRequired: formData.get("isRequired"),

  };

  const blob = await put(rawData.imageFile.name, rawData.imageFile, {
    access: 'public',
  });


  const vehicleId = parseInt(rawData.vehicleId as string);
  const mechanicId = parseInt(rawData.mechanicId as string);
  const appointmentId = parseInt(rawData.appointmentId as string);
  const diagnosis = rawData.diagnosis as string;
  const cost = parseInt(rawData.cost as string);
  const description = rawData.description as string;



  try {
    const newRepair = await prisma.repairs.create({
      data: {
        appointmentId,
        managerId: mechanicId,
        diagnosis,
        vehicleId,
        ApprovedByCliente: false,
        initialStateImage: blob.url,
        isRequired: rawData.isRequired === "true" ? true : false,
      },
     
    });

    await prisma.repairDetails.create({
      data: {
        repairId: newRepair.id,
        description: description,
        cost: cost,
      }
    })

    if (!newRepair) {
      throw new Error("Error creating new repair");
    }

    revalidatePath("/admin/appointments/manage/[id]", "page");

    return newRepair;

  } catch (error) {
    console.error(error);
  }
};