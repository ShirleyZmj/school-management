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
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3030/api/:path*",
      },
    ];
  },
  transpilePackages: ["@repo/shared"],
  experimental: {
    externalDir: true,
  },
};

export default nextConfig;
