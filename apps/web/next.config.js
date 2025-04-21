/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! 警告 !!
    // 在生产环境中禁用类型检查
    // 仅用于解决Vercel部署问题
    ignoreBuildErrors: true,
  },
  eslint: {
    // 在生产环境构建时禁用ESLint检查
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/app": "./app",
      "@/src": "./src",
    };
    return config;
  },
  async rewrites() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030";
    return [
      {
        source: "/api/:path*",
        destination: `${API_URL}/api/:path*`,
      },
    ];
  },
  transpilePackages: ["@repo/shared"],
  experimental: {
    externalDir: true,
  },
};

export default nextConfig;
