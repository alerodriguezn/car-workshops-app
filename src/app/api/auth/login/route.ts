
import { signIn } from "@/auth";


export async function POST(request: Request) {

    const body = await request.json();

    const { email, password } = body;

    try {
        await signIn("credentials", { email, password });
        return {
          ok: true,
        };
      } catch (error) {
        console.log(error);
        return {
          ok:false,
          message: 'Error when login'
        }
      }
 
}
