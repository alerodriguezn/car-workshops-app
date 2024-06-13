import prisma from "@/lib/prisma";




export async function POST(request: Request) {

    const data = await request.formData();

    const appointmentId = data.get("appointmentId") as string;
    const managerId = data.get("managerId") as string;
    const diagnosis = data.get("diagnosis") as string;
    const vehicleId = data.get("vehicleId") as string;
    const description = data.get("description") as string;
    const cost = data.get("cost") as string;


  
   
    try {
      const prismaTx = await prisma.$transaction(async (tx) => {

        const newRepairs =await tx.repairs.create({
          data: {
            appointmentId: Number(appointmentId), 
            managerId: Number(managerId),
            diagnosis,
            repairStatus: "Pending",
            ApprovedByCliente: false, 
            vehicleId: Number(vehicleId),

          },
        });

        const newRepairDetails = await tx.repairDetails.create({
          data: {
            repairId: newRepairs.id , 
            description,
            cost: Number(cost),
          },
        });

        
      
        return newRepairs;
      });

      //execute transaction
      await prismaTx;

      return Response.json({message: "Repair created successfully",
      });

    }catch{
      return Response.json({ message: "Error creating repair" });
    }

  }