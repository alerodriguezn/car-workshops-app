import prisma from "@/lib/prisma";

//update status to approved
export async function PUT(
  request: Request,
  { params }: { params: { repairId: number } }
) {
  const { repairId } = params;

  const repair = await prisma.repairs.update({
    where: {
      id: Number(repairId),
    },
    data: {
      repairStatus: "In Progress",
    },
  });

  if (!repair) {
    return Response.json({ message: "Appointmend not found" });
  }

  return Response.json({ ok : true });
}
