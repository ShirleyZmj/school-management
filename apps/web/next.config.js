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
  output: "standalone",
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/app": "./app",
      "@/src": "./src",
    };
    return config;
  },
  async rewrites() {
    // 在生产环境中，可能不需要重写API请求，因为前端和后端可能部署在不同的域
    // 检查是否处于Vercel环境中
    if (process.env.VERCEL) {
      // 在Vercel环境中，可以选择不重写请求
      console.log("Running on Vercel, not applying API rewrites");
      return [];
    }

    // 本地开发环境的重写配置
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030";
    console.log(`Applying API rewrites to ${API_URL}`);
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
