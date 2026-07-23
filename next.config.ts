import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "randomuser.me" },
      // Supabase Storage (admin image uploads)
      { protocol: "https", hostname: "bznwnfglwvktivjvfnbj.supabase.co" },
    ],
  },
};

export default nextConfig;
