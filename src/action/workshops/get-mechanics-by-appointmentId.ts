"use server";
import prisma from "@/lib/prisma";

export const getMechanicsByAppointmentId = async (appointmentId: number) => {
    try {
        // Obtenemos el workshopId de la cita
        const appointment = await prisma.appointment.findUnique({
          where: { id: appointmentId },
          select: {
            workshopId: true,
          },
        });
    
        if (!appointment) {
          throw new Error('Appointment not found');
        }
    
        // Obtenemos los mecánicos del taller
        const mechanics = await prisma.mechanic.findMany({
          where: {
            workshopId: appointment.workshopId,
          },
        });
    
        return mechanics;
      } catch (error) {
        console.error(error);
        throw error;
      }
};
