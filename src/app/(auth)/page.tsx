import Link from "next/link";
import { GiMechanicGarage } from "react-icons/gi";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center w-full gap-4">

      <div className="flex flex-col justify-center items-center ">
        <GiMechanicGarage size={100} color=""  />
        <h2 className="text-2xl font-bold">Admin Panel</h2>
    
      </div>

      <div className="flex gap-2">
        <Link
          href={"/login"}
          className="btn-primary w-[200px] text-center font-bold"
        >
          Login
        </Link>
        <Link
          href={"/new-account"}
          className="btn-primary w-[200px] text-center font-bold"
        >
          New Account
        </Link>
      </div>
    </div>
  );
}
