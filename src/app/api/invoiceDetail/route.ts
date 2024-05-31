import { InvoiceDetail } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    const body = await request.json();
  
    const { invoiceId, repairDetailId}: InvoiceDetail = body;
  
    try {
      const newInvoiceDetail = await prisma.invoiceDetail.create({
        data: {
            invoiceId,
            repairDetailId, 
          
        },
      });
  
      if (!newInvoiceDetail) {
        return Response.json({ message: "Invoice detail not created" });
      }
  
      return Response.json({ newInvoiceDetail});
    } catch (error) {
      return Response.json({ message: "Error creating invoice detail" });
    }
  }