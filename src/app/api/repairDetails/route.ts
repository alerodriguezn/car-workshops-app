import { RepairDetails } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    const body = await request.json();
  
    const { repairId, description, cost }: RepairDetails = body;
  
    try {
      const newRepairDetails = await prisma.repairDetails.create({
        data: {
          repairId, 
          description,
          cost,
        },
      });
  
      if (!newRepairDetails) {
        return Response.json({ message: "Repair details not created" });
      }
  
      return Response.json({ newRepairDetails });
    } catch (error) {
      return Response.json({ message: "Error creating repair details" });
    }
  }