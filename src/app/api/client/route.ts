import prisma from "@/lib/prisma";
import { Client } from "@prisma/client";
import bcryptjs from "bcryptjs";


//Add new Client

export async function POST(request: Request) {
  const body = await request.json();

  const { name, email, password }: Client = body;

  try {
    const newClient = await prisma.client.create({
      data: {
        name,
        email,
        password: bcryptjs.hashSync(password),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!newClient) {
      return Response.json({ message: "Client not created" });
    }

    return Response.json({ newClient });
  } catch (error) {
    return Response.json({ message: "Error creating client" });
  }
}

