import prisma from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { id: number } }
) {
  const { id } = params;

  const invoice = await prisma.invoice.update({
    where: {
      id: Number(id),
    },
    data: {
      status: "Paid",
    },
  });

  await prisma.appointment.update({
    where: {
      id: invoice.idAppointment,
    },
    data: {
      status: "Paid",
    },
  })

  if (!invoice) {
    return Response.json({ message: "Invoice not found" });
  }

  return Response.json({ invoice });
}
