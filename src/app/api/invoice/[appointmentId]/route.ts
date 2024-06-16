
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { appointmentId: number } }
) {
  const { appointmentId } = params;

  const invoice = await prisma.invoice.findUnique({
    where: {
      idAppointment: Number(appointmentId),
    },
    select: {
      id: true,
      total: true,
      idAppointment: true,
      status: true,
      invoiceDetail: {
        select: {
          repairDetail: {
            select: {
              id: true,
              description: true,
              cost: true,
            },
          },
        },
      },
    },
  });
  
  if (!invoice) {
    return Response.json({ message: "Invoice not found" });
  }
  console.log(invoice);

  return Response.json({ invoice });

}
