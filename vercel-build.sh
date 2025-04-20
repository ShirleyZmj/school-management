#!/bin/bash

pnpm install
pnpm build --filter="@repo/shared"
pnpm build --filter="web"

# # 输出调试信息
# echo "Current working directory: $(pwd)"
# echo "Listing workspace packages:"
# ls -la packages/

# # 只构建前端需要的包
# echo "Building shared package..."
# pnpm build --filter="@repo/shared"

# # 输出shared包构建结果
# echo "Shared package build result:"
# ls -la packages/shared/dist/

# # 返回到web应用并构建
# echo "Building web application..."
# cd apps/web

# # 确保web应用目录下的next依赖已安装
# echo "Installing web app dependencies..."
# pnpm install

# # 构建web应用
# echo "Building web app..."
# pnpm build