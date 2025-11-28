import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ayf880m0rc.ufs.sh"
      }
    ]
  }
};

export default nextConfig;
