import { AppointmentDetailsResponse } from "@/interface/AppointmentDetails";
import Link from "next/link";


interface Props {
    params: {
      id: number;
    };
  }
  

export default async function ManageAppointmentPage({ params }:Props) {

  const { id } = params;

  const getAppointmentById = async () => {
    "use server"
    const res = await fetch(
      `http://localhost:3000/api/appointmentDetails/${id}`
    );
    const data: AppointmentDetailsResponse = await res.json();

    return data;
  }

    const { appointmentDetails } = await getAppointmentById();

    if(appointmentDetails.appointment.status !== "Accepted"){
        return (
            <div className="flex flex-col justify-center items-center">
                <h1 className="font-light underline text-xl">The appointment date has not been accepted yet</h1>
                <Link href="/admin" className="btn-primary mt-4" >Go Back</Link>
            </div>
        )
    }



  return (
    <div>
      {appointmentDetails.description}
    </div>
  );
}