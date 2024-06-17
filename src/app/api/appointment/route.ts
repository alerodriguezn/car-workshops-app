import prisma from "@/lib/prisma";
import { put } from "@vercel/blob";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.formData();


  const make = data.get("make") as string;
  const model = data.get("model") as string;
  const year = data.get("year") as string;
  const clientId = data.get("clientId") as string;
  const workshopId = data.get("workshopId") as string;
  const description = data.get("description") as string;
  const media = data.get("media");

  return Response.json({ 
    make,
    model,
    year,
    clientId,
    workshopId,
    description,
    media,
    data
  });


  // try {
  //   const prismaTx = await prisma.$transaction(async (tx) => {

  
  //     const newVehicle = await tx.vehicle.create({
  //       data: {
  //         make,
  //         model,
  //         year: Number(year),
  //         ownerId: Number(clientId),
  //       },
  //     });

  //     // new appointment
  //     const newAppointment = await tx.appointment.create({
  //       data: {
  //         status: "Pending",
  //         workshopId: Number(workshopId),
  //         clientId: Number(clientId),
  //         vehicleId: newVehicle.id,
  //       },
  //     });

  //     // new appointment detail
  //     const newAppointmentDetail = await tx.appointmentDetail.create({
  //       data: {
  //         appointmentId: newAppointment.id,
  //         description,
  //       },
  //     });

  //     const uploadImage = async () => {
  //       const blob = await put(media.name, media, {
  //         access: "public",
  //       });

  //       return blob;
  //     };

  //     const imageUrl = await uploadImage();

  //     // new appointment media
  //     await tx.appointmentMedia.create({
  //       data: {
  //         appointmentDetailId: newAppointmentDetail.id,
  //         mediaUrl: imageUrl.url,
  //       },
  //     });
  //     return newAppointment;
  //   });

  //   //execute transaction
  //   await prismaTx;

  //   return Response.json({
  //     message: "Appointment created successfully",
  //   });
    
  // } catch (error) {
  //   return Response.json({ message: "Error creating appointment", error, data });
  // }
}
// Get All appointment by clientId

export async function GET(
  request: Request
) {
  const { searchParams } = new URL(request.url);

  const clientId = searchParams.get("clientId");

  //Obtener todas la citas por id de cliente
  const appointments = await prisma.appointment.findMany({
    where: {
      clientId: Number(clientId),
    },
    select: {
      id: true,
      status: true,
       date: true,
      clientId: true,
      vehicleId: true,
      workshopId: true,
      appointmentDetail: {
        select: {
          description: true,
          appointmentmedia: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  if (!appointments) {
    return Response.json({ message: "Appointment not found" });
  }

  return Response.json({ appointments });
}
