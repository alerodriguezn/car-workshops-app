import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const workshop = await prisma.workshop.findMany({
    where: {
      ownerId: id,
    }
  });

  if (!workshop) {
    return Response.json({ message: "Workshops not found" });
  }

  return Response.json({ workshop });
}
