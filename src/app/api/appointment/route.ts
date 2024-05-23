import prisma from "@/lib/prisma";
import { Appointment } from "@prisma/client";
import { put } from "@vercel/blob";
import formidable from "formidable";
import { NextRequest } from "next/server";



export async function POST(request: NextRequest) {

  const data = await request.formData();

  const make = data.get("make") as string;
  const model = data.get("model") as string;
  const year = data.get("year") as string;
  const clientId = data.get("clientId") as string;
  const workshopId = data.get("workshopId") as string;
  const description = data.get("description") as string;
  const media = data.get("media") as File;

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {

      console.log(make, model, year, clientId, workshopId, description)
      //new vehicle
      const newVehicle = await tx.vehicle.create({
        data: {
          make,
          model,
          year: Number(year),
          ownerId: Number(clientId),
        },
      });


      // new appointment
      const newAppointment = await tx.appointment.create({
        data: {
          status: "Pending",
          workshopId: Number(workshopId),
          clientId: Number(clientId),
          vehicleId: newVehicle.id,
        },
      });

      // new appointment detail
      const newAppointmentDetail = await tx.appointmentDetail.create({
        data: {
          appointmentId: newAppointment.id,
          description,
        },
      });

      const uploadImage = async () => {
        const blob = await put(media.name, media, {
          access: "public",
        });

        return blob;
      };

      const imageUrl = await uploadImage();

      // new appointment media
      await tx.appointmentMedia.create({
        data: {
          appointmentDetailId: newAppointmentDetail.id,
          mediaUrl: imageUrl.url,
        },
      });
      return newAppointment;
      

    });

    //execute transaction
    await prismaTx;


    return Response.json({
      message: "Appointment created successfully",
      
    });
  } catch (error) {
    return Response.json({ message: "Error creating appointment" });
  }
}
