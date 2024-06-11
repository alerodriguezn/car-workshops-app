
import { signIn } from "@/auth";


export async function POST(request: Request) {

    const body = await request.json();

    const { email, password } = body;

    try {
        await signIn("credentials", { email, password });

        return Response.json({
            ok: true,
            message: "User Logged In",
        });
      } catch (error) {
        console.log(error);
      
      }
 
}
