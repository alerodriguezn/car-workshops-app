import prisma from "@/lib/prisma";
import { Workshop } from "@prisma/client";

// Add new Workshop
export async function POST(request: Request) {
  const body = await request.json();

  const { name, location, speciality, owner, rating }: Workshop = body;

  try {
    const newWorkshop = await prisma.workshop.create({
      data: {
        name,
        location,
        speciality,
        owner,
        rating,
      },
    });

    if (!newWorkshop) {
      return Response.json({ message: "Workshop not created" });
    }

    return Response.json({ newWorkshop });
  } catch (error) {
    return Response.json({ message: "Error creating workshop" });
  }
}

// Get All Workshops with filters

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const rating = searchParams.get("rating");
  const search = searchParams.get("search");
  const speciality = searchParams.get("speciality");
  const location = searchParams.get("location");

  console.log({ rating, search, speciality, location });

  const workshops = await prisma.workshop.findMany({
    where: {
      AND: [
        search ? { name: { contains: search } } : {},
        speciality ? { speciality: { contains: speciality } } : {},
        location ? { location: { contains: location } } : {},
        rating ? { rating: { gte: Number(rating) } } : {},
      ],
    },
  });

  return Response.json({ workshops });
}
