import { getWorkshopByOwner } from "@/action/workshops/get-workshop-by-owner";
import { WorkshopsTable } from "../../components/workshops/WorkshopsTable";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const { workshops , ok } = await getWorkshopByOwner(session.user.id);

  if (!ok || !workshops) {
    return (
      <div>
        <h1>Workshop not found</h1>
      </div>
    );
  }

  

  return (
    <div className="w-3/4 flex flex-col justify-center items-center">
      <h3 className="text-3xl font-bold text-center mt-6">My Workshops</h3>
      <p className="font-light mb-6 mt-2">Administration Panel for car workshops</p>
      <WorkshopsTable workshops={workshops} />
    </div>
  );
}

