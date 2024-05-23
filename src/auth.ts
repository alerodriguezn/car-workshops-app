import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import prisma from "./lib/prisma"
import bcryptjs from 'bcryptjs';
import { z } from "zod";

 
export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
     
      authorize: async (credentials) => {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

          const { email, password } = parsedCredentials.data;
  
          console.log(email, password)
  
          const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  
          console.log(user)
  
          if(!user) return null
  
          if(!bcryptjs.compareSync( password, user.password )) return null
  
          const { password: _, ...rest } = user;
  
          return rest
        }
    }),
  ],
})