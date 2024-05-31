import { Invoice } from "@prisma/client";
import prisma from "@/lib/prisma";




export async function POST(request: Request) {

    const body = await request.json();
  
    //desectructurar el body, no recibe repairStatus ni ID
    const {idAppointment, total }:Invoice = body;
    try {
      const newInvoice =await prisma.invoice.create({
        data: {
          idAppointment, 
          total,
        },
      });
      if (!newInvoice) {
        return Response.json({ message: "Invoice not created" });
      }

      return Response.json({newInvoice})

    }catch{
      return Response.json({ message: "Error creating Invoice" });
    }

  }