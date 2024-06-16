
//check if all the repairs are completed
import prisma from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: { appointmentId: number } }
  ) {
    const { appointmentId } = params;

    const repairs = await prisma.repairs.findMany({
      where: {
        appointmentId: Number(appointmentId),
      },
    });

    if (!repairs) {
      return Response.json({ message: "Repairs not found" });
    }

    const isAllRepairsCompleted = repairs.every(
      (repair) => repair.repairStatus === "Completed"
    );

    return Response.json({ isAllRepairsCompleted });

    
}