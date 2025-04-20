#!/bin/bash

# 输出调试信息
echo "Current working directory: $(pwd)"
echo "Listing workspace packages:"
ls -la packages/

# 确保pnpm安装完成
echo "Installing dependencies..."
pnpm install

# 构建shared包
echo "Building shared package..."
cd packages/shared
pnpm build --no-cache
cd ../..

# 输出shared包构建结果
echo "Shared package build result:"
ls -la packages/shared/dist/

# 返回到web应用并构建
echo "Building web application..."
cd apps/web
pnpm install
pnpm build --no-cache 