import { signIn } from "@/auth";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";

export async function POST(request: Request) {
  const body = await request.json();

  const { name, email, password } = body;

  try {
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email.toLowerCase(),
        password: bcryptjs.hashSync(password),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return Response.json({
      ok: true,
      user: user,
      message: "User Created",
    });
  } catch (error) {
    console.log(error);
  }
}
