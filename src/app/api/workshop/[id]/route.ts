import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const { id } = params;

  const workshop = await prisma.workshop.findUnique({
    where: {
      id: Number(id),
    },
    select: {
        id :true
    }
  });

  if (!workshop) {
    return Response.json({ message: "Workshop not found" });
  }

  return Response.json({ workshop });
}
