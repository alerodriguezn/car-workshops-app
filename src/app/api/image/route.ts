
import { put } from "@vercel/blob";


export async function POST(request: Request) {
  const body = await request.formData();

  const media = body.get("media") as File;

  if (!media) {
    return new Response(JSON.stringify({ message: "No media file provided" }), { status: 400 });
  }

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

    return new Response(JSON.stringify({ url }), { status: 200 });

  } catch (error) {
    console.error("Error uploading image:", error);
    return new Response(JSON.stringify({ message: "Error uploading image" }), { status: 500 });
  }
}