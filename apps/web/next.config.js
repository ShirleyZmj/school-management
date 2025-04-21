/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/app": "./app",
      "@/src": "./src",
    };
    return config;
  },
  async rewrites() {
    if (process.env.VERCEL) {
      return [];
    }
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030";
    return [
      {
        source: "/api/:path*",
        destination: `${API_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
