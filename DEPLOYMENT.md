# 学校管理系统云端部署指南

## 准备工作

1. 一个云服务提供商账户（如阿里云、腾讯云、AWS、Google Cloud等）
2. PostgreSQL 数据库实例（可以使用云服务商提供的托管数据库服务）
3. Node.js 运行环境（建议使用 Node.js v18+ LTS版本）

## 1. 设置云数据库

### 创建 PostgreSQL 数据库实例

1. 在云服务控制台创建 PostgreSQL 数据库实例
2. 设置数据库名称为 `school_management_db`
3. 创建数据库用户并设置安全的密码
4. 配置数据库的安全组/防火墙，允许应用服务器访问数据库
5. 记录数据库连接信息：主机名、端口、用户名和密码

## 2. 配置环境变量

修改 `apps/api/.env.prod` 文件，更新数据库连接信息：

```
DATABASE_URL="postgresql://实际用户名:实际密码@数据库主机地址:5432/school_management_db"
```

## 3. 构建应用

在本地执行以下命令构建应用：

```bash
# 安装依赖
pnpm install

# 生成 Prisma 客户端
cd apps/api
npx prisma generate

# 构建应用
pnpm build
```

## 4. 部署到云服务器

### 方法一：直接部署到云服务器

1. 将构建后的文件上传到云服务器
   ```bash
   # 例如使用 scp 命令
   scp -r apps/api/dist apps/api/package.json apps/api/prisma user@your-server-ip:/path/to/app
   ```

2. 在服务器上安装依赖
   ```bash
   cd /path/to/app
   npm install --production
   ```

3. 迁移数据库
   ```bash
   npx prisma migrate deploy
   ```

4. 启动应用
   ```bash
   # 可以使用 PM2 等工具管理进程
   npm install -g pm2
   pm2 start dist/main.js --name school-management-api
   ```

### 方法二：使用 Docker 部署

1. 在项目根目录创建 `Dockerfile`
2. 构建 Docker 镜像并推送到容器仓库
3. 在云服务器上拉取并运行容器

## 5. 设置前端应用

1. 在 `apps/web` 目录中，更新 API 基础 URL 指向云端 API 服务
2. 构建前端应用
   ```bash
   cd apps/web
   pnpm build
   ```
3. 将前端构建文件部署到 Web 服务器或静态文件托管服务

## 6. 配置域名和 HTTPS（可选但推荐）

1. 为应用配置域名
2. 设置 HTTPS 证书（可以使用 Let's Encrypt 等服务）
3. 配置反向代理（如 Nginx）指向应用服务

## 故障排除

- 如果连接数据库失败，检查:
  - 数据库连接字符串是否正确
  - 防火墙/安全组配置是否允许连接
  - 数据库用户权限是否设置正确

- 如果应用无法启动，检查:
  - 查看日志 `pm2 logs school-management-api`
  - 确认环境变量是否正确加载
  - 确认服务器端口是否已开放

## 监控与维护

1. 设置日志监控
2. 配置数据库备份策略
3. 设置应用性能监控

若需要更多帮助，请参考具体云服务提供商的文档。 