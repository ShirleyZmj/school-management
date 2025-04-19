FROM node:18-alpine AS builder

WORKDIR /app

# 复制项目文件
COPY . .

# 安装依赖并构建应用
RUN npm install -g pnpm
RUN pnpm install
RUN cd apps/api && npx prisma generate
RUN pnpm build

# 生产环境阶段
FROM node:18-alpine AS production

WORKDIR /app

# 复制构建结果和必要文件
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/package.json ./
COPY --from=builder /app/apps/api/prisma ./prisma
COPY --from=builder /app/apps/api/.env.prod ./.env

# 安装生产依赖
RUN npm install --production

# 暴露端口
EXPOSE 3000

# 运行应用
CMD ["node", "dist/main.js"] 