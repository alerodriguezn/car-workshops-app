import prisma from "@/lib/prisma";
import { Client } from "@prisma/client";
import { redirect } from "next/navigation";

//Get Client by ID

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const { id } = params;

  const client = await prisma.client.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!client) {
    return Response.json({ message: "Client not found" });
  }

  return Response.json({ client });
}
