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

import { Workshop } from "@prisma/client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface Props {
  workshops: Workshop[];
}

export function WorkshopsTable({ workshops }: Props) {


  const router = useRouter();

  return (
    <Table className="border-2 border-slate-200">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Speciality</TableHead>
          <TableHead>Options</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {workshops.map((workshop) => (
          <TableRow key={workshop.id}>
            <TableCell className="font-medium">{workshop.name}</TableCell>
            <TableCell>{workshop.location}</TableCell>
            <TableCell>{workshop.speciality}</TableCell>
            <TableCell>
              <Button
                color="primary"
                onClick={() => {
                  router.push(`/admin/appointments/${workshop.id}`);
                }}
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
