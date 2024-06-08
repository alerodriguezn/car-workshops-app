import prisma from "@/lib/prisma";
import { Mechanic, Vehicle } from "@prisma/client";

// Add new mechanic

export async function POST(request: Request) {
  const body = await request.json();

  const { name, workshopId }: Mechanic = body;

    try {
        const newMechanic = await prisma.mechanic.create({
        data: {
            name,
            workshopId,
        },
        });
    
        if (!newMechanic) {
        return Response.json({ message: "Mechanic not created" });
        }
    
        return Response.json({ newMechanic });
    } catch (error) {
        return Response.json({ message: "Error creating mechanic" });
    }

}
