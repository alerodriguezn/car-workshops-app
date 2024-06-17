export const dynamic = 'force-dynamic'

import { getMechanicsByAppointmentId } from "@/action/workshops/get-mechanics-by-appointmentId";
import { AppointmentDetailsResponse } from "@/interface/AppointmentDetails";
import Link from "next/link";
import { createNewRepair } from "@/action/repair/create-new-repair";
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
      `http://localhost:3000/api/appointmentDetails/${id}`,
      { cache: "no-store" }
    );
    const data: AppointmentDetailsResponse = await res.json();

    return data;
  };

  const { appointmentDetails } = await getAppointmentById();
  const mechanics = await getMechanicsByAppointmentId(Number(id));

  const newRepair = createNewRepair.bind(null);

  const allRepairs = await getAllRepairsByAppointment(Number(id));

  if (appointmentDetails.appointment.status === "Created") {
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
      <form action={newRepair} className="grid grid-cols-2 gap-4 mt-4 border-2 border-slate-300 p-2 ">
        <div className="flex w-[400px] items-center">
          <label htmlFor="managerId" className="font-bold mr-2">
            Mechanic:
          </label>
          <select name="managerId" className="border-2 border-slate-600 rounded-lg">
            {mechanics.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex w-[400px] items-center">
          <label htmlFor="cost" className="font-bold mr-2">
            Cost:
          </label>
          <input
            name="cost"
            type="number"
            className="p-1 border-2 border-slate-600 rounded"
          />
        </div>

        <div className="flex w-[400px]">
          <label htmlFor="managerId" className="font-bold mr-2">
            Report Initial State (Image):
          </label>
          <input type="file" id="image" name="image" required />
        </div>

        <div className=" invisible hidden ">
          <input type="hidden" name="appointmentId" value={id} />
          <input
            type="hidden"
            name="vehicleId"
            value={appointmentDetails.appointment.vehicleId}
          />
        </div>

        <div className="flex w-[400px] items-center">
          <label htmlFor="diagnosis" className="font-bold mr-2">
            Diagnosis:
          </label>
          <textarea
            name="diagnosis"
            id="diagnosis"
            className="p-1 border-2 border-slate-600 rounded"
          ></textarea>
        </div>

        <div className="flex w-[400px] items-center">
          <label htmlFor="description" className="font-bold mr-2">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className="p-1 border-2 border-slate-600 rounded"
          ></textarea>
        </div>

        <div className="flex w-[400px] items-center">
          <label htmlFor="isRequired" className="font-bold mr-2">
            Is Required
          </label>
          <input
            name="isRequired"
            type="radio"
            value="true"
            className="p-1 border-2 border-slate-600 rounded mr-6"
          />
          <label htmlFor="isRequired" className="font-bold mr-2">
            Not Required
          </label>
          <input
            name="isRequired"
            type="radio"
            value="false"
            className="p-1 border-2 border-slate-600 rounded"
          />
        </div>

        <button type="submit" className="btn-primary w-40 mt-4">
          Add Repair
        </button>
      </form>

      <RepairsTable repairs={allRepairs} />
    </div>
  );
}
