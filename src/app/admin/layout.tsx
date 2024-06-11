

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/sonner"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }
  
  return (
    <main className="min-h-screen flex justify-center ">
      { children }
      <Toaster/>
    </main>
  );
}
