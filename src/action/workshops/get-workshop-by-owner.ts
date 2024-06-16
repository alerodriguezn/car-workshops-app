"use server";

import prisma from "@/lib/prisma";

export const getWorkshopByOwner = async (ownerId: string) => {
  try {

    console.log("ownerId", ownerId);

    const workshops = await prisma.workshop.findMany({
      where: {
        ownerId: ownerId,
      },
    });

    if (!workshops) {
      return {
        ok: false,
        message: "Workshop not found",
      };
    }

    return {
      ok: true,
      workshops,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error when get workshop",
    };
  }
};
