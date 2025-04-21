#!/bin/bash

# 开启错误跟踪，但让构建脚本继续执行，以便我们可以看到所有输出
set -x

NODE_ENV=development pnpm install --frozen-lockfile

# 输出调试信息
echo "Current working directory: $(pwd)"
echo "Node.js version: $(node -v)"
echo "NPM version: $(npm -v)"
echo "PNPM version: $(pnpm -v)"

# 只构建前端需要的包
echo "Building shared package..."
pnpm build --filter="@repo/shared" || echo "Shared package build failed but continuing..."

# 输出shared包构建结果
echo "Shared package build result:"
ls -la packages/shared/dist/ || echo "Cannot list shared dist directory"

# 返回到web应用并构建
echo "Building web application..."
cd apps/web || exit 1
echo "Web directory: $(pwd)"

# 确保web应用目录下的next依赖已安装
echo "Installing web app dependencies..."
NODE_ENV=production pnpm install --no-frozen-lockfile

# 显示可用文件
echo "Listing web directory files:"
ls -la

# 显示node_modules目录是否存在next
echo "Checking for next in node_modules:"
ls -la node_modules/.bin/

# 显示next.config.js内容
echo "Next.config.js content:"
cat next.config.js

# 设置环境变量
export NEXT_TELEMETRY_DISABLED=1
export NODE_ENV=production

# 使用npx从当前目录的node_modules中运行next
echo "Building web app with npx..."
# 确保运行正确的next
PATH="$(pwd)/node_modules/.bin:$PATH"
echo "PATH=$PATH"
which next
next -v

# 尝试使用vercel-build脚本
echo "Trying to run vercel-build..."
pnpm run vercel-build || echo "Web build failed with vercel-build but continuing..."

# 尝试直接运行next build
echo "Trying to run next build directly..."
node node_modules/next/dist/bin/next build || echo "Web build failed with direct command but continuing..."

# 返回到根目录
cd ../../