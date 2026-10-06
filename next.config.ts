import type { NextConfig } from "next";

const securityHeaders = [
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  images: {
    // Book and guide covers come from the book site's public storage.
    remotePatterns: [new URL("https://lriyamltlgbrhsocyzrv.supabase.co/storage/v1/object/public/**")],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
