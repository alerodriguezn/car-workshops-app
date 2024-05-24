import prisma from "@/lib/prisma";
import { Vehicle } from "@prisma/client";

// Add new Vehicle

export async function POST(request: Request) {
  const body = await request.json();

  const { make, model, year, ownerId }: Vehicle = body;

  try {
    const newVehicle = await prisma.vehicle.create({
      data: {
        make,
        model,
        year,
        ownerId,
      },
    });

    if (!newVehicle) {
      return Response.json({ message: "Vehicle not created" });
    }

    return Response.json({ newVehicle });
  } catch (error) {
    return Response.json({ message: "Error creating vehicle" });
  }
}
