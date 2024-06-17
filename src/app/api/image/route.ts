
import { put } from "@vercel/blob";



export async function POST(request: Request) {
  const body = await request.formData();

  const media = body.get("media") as File;



  try {
    const uploadImage = async () => {
      const blob = await put(media.name, media, {
        access: "public",
      });

      return blob;
    };

    const imageUrl = await uploadImage();

    const url = imageUrl.url;

    console.log(url);

    return Response.json({ url });

  } catch (error) {
    return Response.json({ message: "Error creating invoice detail" });
  }
}
