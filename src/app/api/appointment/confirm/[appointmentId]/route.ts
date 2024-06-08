import prisma from "@/lib/prisma";

//update status to approved
export async function PUT(
  request: Request,
  { params }: { params: { appointmentId: number } }
) {
  const { appointmentId } = params;

  const appointment = await prisma.appointment.update({
    where: {
      id: Number(appointmentId),
    },
    data: {
      status: "Approved",
    },
  });

  if (!appointment) {
    return Response.json({ message: "Appointmend not found" });
  }

  return Response.json({ ok : true });
}
