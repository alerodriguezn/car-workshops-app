import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AppointmentsList } from "@/interface/Appointment";
import Image from "next/image";
import { Vehicle } from "@prisma/client";
import Link from "next/link";
import { AppointmentDrawer } from './ui/AppointmentDrawer';

interface Props {
  params: {
    workshopId: number;
  };
}

export default async function AppointmentPage({ params }: Props) {
  const { workshopId } = params;

  const getAppointments = async () => {
    "use server";
    const res = await fetch(
      `http://localhost:3000/api/appointment/${workshopId}`
    );
    const data: AppointmentsList = await res.json();
    console.log(data);
    return data;
  };

  const { appointments } = await getAppointments();

  return (
    <div className="flex flex-col items-center w-1/4">
      <h2 className="text-center text-2xl font-bold">
        Appointments By Workshop
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {appointments.map((appointment) => (
          <AccordionItem key={appointment.id} value={appointment.id.toString()}>
            <AccordionTrigger>
              <div className="flex items-center justify-between w-full p-4 border-b border-slate-200">
                <p className="font-bold">ID: {appointment.id}</p>
                <p className={`text-sm text-green-600 font-semibold`}>
                  Status: {appointment.status}
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                <div>
                  <p className="font-medium">Owner: {appointment.clientId}</p>
                  <p className="text-sm">
                    {appointment.appointmentDetail.description}
                  </p>
                </div>

                <div>
                 <AppointmentDrawer appointmentId={appointment.id}/>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
