import { getMechanicsByAppointmentId } from "@/action/workshops/get-mechanics-by-appointmentId";
import { AppointmentDetailsResponse } from "@/interface/AppointmentDetails";
import Link from "next/link";
import { createNewRepair } from '@/action/repair/create-new-repair';
import { RepairsTable } from "./ui/RepairsTable";
import { getAllRepairsByAppointment } from "@/action/repair/get-all-repairs-by-appointment";

interface Props {
  params: {
    id: number;
  };
}

export default async function ManageAppointmentPage({ params }: Props) {
  const { id } = params;

  const getAppointmentById = async () => {
    "use server";
    const res = await fetch(
      `http://localhost:3000/api/appointmentDetails/${id}`
    );
    const data: AppointmentDetailsResponse = await res.json();

    return data;
  };

  const { appointmentDetails } = await getAppointmentById();
  const mechanics = await getMechanicsByAppointmentId(Number(id));

  const newRepair = createNewRepair.bind(null)

  const allRepairs = await getAllRepairsByAppointment(Number(id));

  if (appointmentDetails.appointment.status !== "Approved") {
    return (
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-light underline text-xl">
          The appointment date has not been accepted yet
        </h1>
        <Link href="/admin" className="btn-primary mt-4">
          Go Back
        </Link>
      </div>
    );
  }

  return (
    <div className="w-3/4">
      <h2 className="text-center text-2xl font-bold">
        Appointment Number #{appointmentDetails.id}{" "}
      </h2>
      <form action={newRepair} className="flex flex-col gap-2 items-center">
        <div className="flex w-[400px] mt-4">
          <label htmlFor="managerId" className="font-bold mr-2">
            Mechanic
          </label>
          <input name="managerId" type="text" className="p-1 border-2 border-slate-600 rounded"/>
        </div>
        <div className="flex w-[400px]">
          <label htmlFor="diagnosis" className="font-bold mr-2">
            Diagnosis
          </label>
          <textarea name="diagnosis" id="diagnosis" className="p-1 border-2 border-slate-600 rounded"></textarea>
        </div>
        <div className=" invisible ">
          <input type="hidden" name="appointmentId" value={id}  />
          <input type="hidden"name="vehicleId" value={appointmentDetails.appointment.vehicleId}  />

        </div>
        <button type="submit" className="btn-primary">Add New Repair</button>
      </form>

      <RepairsTable repairs={allRepairs}/>
    </div>
  );
}
