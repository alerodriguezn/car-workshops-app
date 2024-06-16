"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Repairs } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { markAsCompleted } from "@/action/repair/mark-as-completed";
import { generateInvoice } from "@/action/invoice/generate-invoice";
import router from "next/navigation";
import { toast } from "sonner";

interface Props {
  repairs: Repairs[] | undefined;
}

export function RepairsTable({ repairs }: Props) {
  const router = useRouter();

  if (!repairs) {
    return (
      <div className="flex justify-center items-center font-bold text-4xl">
        No Repairs
      </div>
    );
  }

  const handleMarkAsCompleted = async (
    repairId: number,
    appointmendId: number
  ) => {
    await markAsCompleted(repairId, appointmendId);
    router.refresh();
  };

  const handleGenereateInvoice = async (appointmentId: number) => {
    await generateInvoice(appointmentId);
    toast.success("Invoice generated successfully");
    router.refresh();
  }

  return (
    <Table className="border-2 border-slate-200 mt-8">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[180px]">Appointment #</TableHead>
          <TableHead>Diagnosis</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Is Required</TableHead>
          <TableHead>Management</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {repairs.map((repair) => (
          <TableRow key={repair.id}>
            <TableCell className="font-medium">
              {repair.appointmentId}
            </TableCell>
            <TableCell>{repair.diagnosis}</TableCell>
            <TableCell>{repair.repairStatus}</TableCell>
            <TableCell>
              {repair.isRequired ? "Required" : "Not Required"}
            </TableCell>

            <TableCell>
              {repair.repairStatus === "In Progress" && (
                <div className="flex flex-col w-3/4  gap-2 mb-2">
                  <button
                    className="btn-primary font-bold"
                    onClick={() => {
                      handleMarkAsCompleted(repair.id, repair.appointmentId);
                    }}
                  >
                    Mark as Completed✅
                  </button>
                  <div>
                    <label htmlFor="file" className="font-bold mr-2">
                      Upload File:
                    </label>
                    <input type="file" id="file" name="file" />
                  </div>
                </div>
              )}

              {repair.repairStatus === "Pending" && (
                <p className="italic">Wait for confirmation</p>
              )}

              {repair.repairStatus === "Completed" && (
                <button onClick={
                  () => handleGenereateInvoice(repair.appointmentId)
                } className="btn-primary">Generate Invoice</button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
