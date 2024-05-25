import { Repairs } from "@prisma/client";
import prisma from "@/lib/prisma";




export async function POST(request: Request) {

    const body = await request.json();
  
    //desectructurar el body, no recibe repairStatus ni ID
    const { appointmentId, managerId, diagnosis, ApprovedByCliente, vehicleId }: Repairs = body;
    try {
      const newRepairs =await prisma.repairs.create({
        data: {
          appointmentId, 
          managerId,
          diagnosis,
          ApprovedByCliente, 
          vehicleId,
        },
      });
      if (!newRepairs) {
        return Response.json({ message: "Repair not created" });
      }

      return Response.json({newRepairs})

    }catch{
      return Response.json({ message: "Error creating repair" });
    }

  }
  