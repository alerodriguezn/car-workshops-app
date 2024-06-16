import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { appointmentId: number } }
) {
  const { appointmentId } = params;

  const repairsByAppointmentId = await prisma.repairs.findMany({
    where: {
      appointmentId: Number(appointmentId),
    },
    select: {
      id: true,
      diagnosis: true,
      repairStatus: true,
      vehicleId: true,
      appointmentId: true,
      managerId: true,
      isRequired: true,
      initialStateImage: true,
      ApprovedByCliente: true,
      repairsDetail: {
        select: {
          id: true,
          description: true,
          cost: true,
        },
      },
    },
  });

  if (!repairsByAppointmentId) {
    return Response.json({ message: "Repair not found" });
  }

  return Response.json({ repairs: repairsByAppointmentId });
}
