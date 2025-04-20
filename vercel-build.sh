#!/bin/bash

# 输出调试信息
echo "Current working directory: $(pwd)"
echo "Listing workspace packages:"
ls -la packages/

# 确保pnpm安装完成
echo "Installing dependencies..."
pnpm install

# 构建所有包
echo "Building all packages..."
pnpm build

# # 构建shared包
# echo "Building shared package..."
# cd packages/shared
# pnpm build
# cd ../..

# # 输出shared包构建结果
# echo "Shared package build result:"
# ls -la packages/shared/dist/

# # 为API应用生成Prisma客户端
# echo "Generating Prisma client for API..."
# cd apps/api
# npx prisma generate
# cd ../..

# # 返回到web应用并构建
# echo "Building web application..."
# cd apps/web
# pnpm install
# pnpm build 