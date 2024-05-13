import { put } from "@vercel/blob";
import Image from "next/image";

export default function Home() {
  
  async function uploadImage(formData: FormData) {
    "use server";
    const imageFile = formData.get("image") as File;
    const blob = await put(imageFile.name, imageFile, {
      access: "public",
    });
    console.log(blob.url);
    return blob;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     
    </main>
  );
}
