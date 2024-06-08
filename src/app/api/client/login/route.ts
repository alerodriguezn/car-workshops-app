import prisma from "@/lib/prisma";
import { Client } from "@prisma/client";
import bcryptjs from "bcryptjs";



export async function POST(request: Request) {
    const { email, password }: Client = await request.json();
  
    try {
      const client = await prisma.client.findFirst({
        where: {
          email,
        },
      });
  
      if (!client) {
        return Response.json({ message: "Client not found" });
      }
  
      const passwordMatch = bcryptjs.compareSync(password, client.password);
  
      if (!passwordMatch) {
        return Response.json({ message: "Invalid password" });
      }
  
      const {password: _, ...c } = client;
  
      return Response.json({ client: c });
  
  
    } catch (error) {
      return Response.json({ message: "Error getting client" });
    }
  }
  
  