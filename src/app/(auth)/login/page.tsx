
import { LoginForm } from './ui/LoginForm';

export default function Login() {
  return (
    <main className="flex flex-col min-h-screen pt-32 sm:pt-52 sm:w-[350px] ">

      <h1 className={`text-4xl mb-5` }>Login</h1>

      <LoginForm/>

      
    </main>
  );
}