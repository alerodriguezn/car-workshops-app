import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { workshopId: number } }
) {
  const { workshopId } = params;

  console.log(workshopId);

  const appointments = await prisma.appointment.findMany({
    where: {
      workshopId: Number(workshopId),
    },
    select: {
      id: true,
      status: true,
      clientId: true,
      vehicleId: true,
      workshopId: true,
      createdAt: true,
      appointmentDetail: {
        select: {
          description: true,
          appointmentmedia: true,
        },
      
      },
    },
    

  });

  if (!appointments) {
    return Response.json({ message: "Workshop not found" });
  }

  return Response.json({ appointments });
}
