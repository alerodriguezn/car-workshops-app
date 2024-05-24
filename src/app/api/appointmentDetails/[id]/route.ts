import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";



interface AppointmentDetail {}

//Get Appointment Details
export async function GET(
    request: Request,
    { params }: { params: { id: number } }
  ) {

    
    const { id } = params;

    
    
    const appointmentDetails = await prisma.appointmentDetail.findUnique({
        where: {
        appointmentId: Number(id),
        },
        select: {
        id: true,
        description: true,
        appointmentmedia: true,
        appointment: {
            select: {
            status: true,
            clientId: true,
            vehicleId: true,
            workshopId: true,
            },
        }
        },
    });
    
    
    if (!appointmentDetails) {
        return Response.json({ message: "Appointment Details not found" });
    }
    
    return Response.json({ appointmentDetails });



}