
import { RegisterForm } from './ui/RegisterForm';


export default function NewAccountPage() {
  return (
    <main className="flex flex-col min-h-screen pt-32 sm:pt-52 sm:w-[350px]">

      <h1 className={ `text-4xl mb-5` }> New Account</h1>

      <RegisterForm/>

      
    </main>
  );
}