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

interface Props {
  repairs: Repairs[] | undefined;
}

export function RepairsTable({ repairs }: Props) {

  
  const router = useRouter();

  if (!repairs) {
    return <div className="flex justify-center items-center font-bold text-4xl">No Repairs</div>;
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
            <TableCell className="font-medium">{repair.appointmentId}</TableCell>
            <TableCell>{repair.diagnosis}</TableCell>
            <TableCell>{repair.repairStatus}</TableCell>
            <TableCell>{repair.isRequired ? "Required" : "Not Required"}</TableCell>

            <TableCell>
              <Button
                color="primary"
                // onClick={() => {
                //   router.push(`/admin/appointments/${workshop.id}`);
                // }}
              >
                Manage
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
