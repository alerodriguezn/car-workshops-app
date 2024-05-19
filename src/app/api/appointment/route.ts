import prisma from "@/lib/prisma";
import { Appointment } from "@prisma/client";
//add new Appointment

export async function POST(request: Request) {
  const body = await request.json();

  const { vehicleId, clientId, workshopId, status }: Appointment = body;

  try {
    const newAppointment = await prisma.appointment.create({
      data: {
        vehicleId,
        clientId,
        workshopId,
        status : "Pending",
      },
    });

    if (!newAppointment) {
      return Response.json({ message: "Appointment not created" });
    }

    return Response.json({ newAppointment });
  } catch (error) {
    return Response.json({ message: "Error creating appointment" });
  }
}
