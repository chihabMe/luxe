"use server";
import { generateCloudinarySignature } from "@/lib/cloudinary";


export async function generateUploadSignature() { 
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = generateCloudinarySignature(
    {
      timestamp: timestamp,
      folder: "worldtech", // Optional: specify upload folder

    },
    process.env.CLOUDINARY_API_SECRET!
  );

  return {
    timestamp,
    signature,
    apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  };
}