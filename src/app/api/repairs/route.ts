import { Repairs } from "@prisma/client";




export async function POST(request: Request) {

    const body = await request.json();
  
    //desectructurar el body, no recibe repairStatus ni ID
    const {  }: Repairs = body;
  

  }
  