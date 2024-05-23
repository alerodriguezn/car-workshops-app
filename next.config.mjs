/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol:"https",
                hostname:"0cpvjtbw01s3lur3.public.blob.vercel-storage.com"
            }
        ]
    }
};

export default nextConfig;
