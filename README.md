# Turborepo starter

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `apps/api`: a [Nest.js](https://nestjs.com/) app
- `apps/web`: another [Next.js](https://nextjs.org/) app
- `packages/shared`: a shared library for the monorepo, contains common utilities, services, and types

- `packages/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `packages/typescript-config`: `tsconfig.json`s used throughout the monorepo
- `packages/ui`: a stub React component library shared by the web apps (demo only)

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Projects Description
1. `apps/api`:
    - A Nest.js app that serves as an API for the web app.
    - It contains the following modules:
        - `classes`: class management module
        - `teachers`: teacher management module
    - It uses the following main technologies:
        - [Nest.js](https://nestjs.com/)
        - [Prisma](https://www.prisma.io/)
        - [PostgreSQL](https://www.postgresql.org/)

2. `apps/web`:
    - A Next.js app that serves as a web app for the API.
    - It contains the following modules:
        - `classes`: class management module
        - `teachers`: teacher management module
    - It uses the following main technologies:
        - [Next.js](https://nextjs.org/)
        - [Ant Design 5](https://ant.design/)
        - [Tailwind CSS](https://tailwindcss.com/)
        - [React 19](https://react.dev/)

3. `packages/shared`:
    - A shared library for the monorepo, contains common utilities, services, and types.
    - Currently, it contains common types for both the API and the web app.


### How to run the project
1. Install dependencies [pnpm](https://pnpm.io/installation)
```
  npm install pnpm -g
  pnpm install
```

2. Install postgresql and start the service
```
brew install postgresql
brew services start postgresql@14
```

3. create database
```
psql postgres
CREATE DATABASE school_management;
```

4. postgreSql command

4.1. to check the database list
```
\l
```

4.2. to choose the database
```
\c school_management
```

5. config the database settings in apps/api
```
cd apps/api
```

5.1. create .env file
```
touch .env
```

5.2. config the database settings
```
DATABASE_URL="postgresql://username:password@localhost:5432/database
```
- username: your postgresql username.
- password: your postgresql password.
- localhost: database host address.
- 5432: postgresql default port.
- database: your created database name.


for example:
- my username is zhangmengjia
- password is null
- my database name is school_management
  
```
DATABASE_URL="postgresql://zhangmengjia:@localhost:5432/school_management"
```

5.3. connect the database
```
pnpm run migrate
```

6. see the database
```
pnpm run prisma:studio 
```
It will open a new tab: http://localhost:5555

7. run the project
go back to the root directory, run all projects
```
pnpm run dev
```
Open the browser, visit http://localhost:3000

## How to use the project
1. teacher management
1.1. see the list of teachers
1.2. create a new teacher

2. class management
2.1. see the list of classes
2.2. create a new class



# Turborepo 启动项目 中文版本介绍

## 包含内容

这个 Turborepo 包含以下包/应用：

### 应用和包

- `apps/api`：一个 [Nest.js](https://nestjs.com/) 应用
- `apps/web`：另一个 [Next.js](https://nextjs.org/) 应用
- `packages/shared`：一个用于 monorepo 的共享库，包含通用的工具、服务和类型

- `packages/eslint-config`：`eslint` 配置（包括 `eslint-config-next` 和 `eslint-config-prettier`）
- `packages/typescript-config`：在整个 monorepo 中使用的 `tsconfig.json`
- `packages/ui`：一个由 web 应用共享的 React 组件库（仅用于演示）

每个包/应用都是 100% [TypeScript](https://www.typescriptlang.org/) 编写的。

### 项目描述
1. `apps/api`：
    - 一个 Nest.js 应用，作为 web 应用的 API。
    - 它包含以下模块：
        - `classes`：班级管理模块
        - `teachers`：教师管理模块
    - 它使用以下主要技术：
        - [Nest.js](https://nestjs.com/)
        - [Prisma](https://www.prisma.io/)
        - [PostgreSQL](https://www.postgresql.org/)

2. `apps/web`：
    - 一个 Next.js 应用，作为 API 的 web 应用。
    - 它包含以下模块：
        - `classes`：班级管理模块
        - `teachers`：教师管理模块
    - 它使用以下主要技术：
        - [Next.js](https://nextjs.org/)
        - [Ant Design 5](https://ant.design/)
        - [Tailwind CSS](https://tailwindcss.com/)
        - [React 19](https://react.dev/)

3. `packages/shared`：
    - 一个用于 monorepo 的共享库，包含通用的工具、服务和类型。
    - 目前，它包含 API 和 web 应用的通用类型。

### 如何运行项目
1. 安装依赖 [pnpm](https://pnpm.io/installation)
```
  npm install pnpm -g
  pnpm install
```

2. 安装 postgresql 并启动服务
```
brew install postgresql
brew services start postgresql@14
```

3. 创建数据库
```
psql postgres
CREATE DATABASE school_management;
```

4. postgreSql 命令
4.1. 查看数据库列表
```
\l
```

4.2. 选择数据库
```
\c school_management
```

5. 配置 apps/api 中的数据库设置
```
cd apps/api
```

5.1. 创建 .env 文件
```
touch .env
```

5.2. 配置数据库设置
```
DATABASE_URL="postgresql://username:password@localhost:5432/database
```
- username: 你的 postgresql 用户名。
- password: 你的 postgresql 密码。
- localhost:  数据库主机地址。
- 5432: postgresql 默认端口。
- database: 你创建的数据库名称。

例如：
- 我的用户名是 zhangmengjia
- 密码为空
- 我的数据库名称是 school_management

```
DATABASE_URL="postgresql://zhangmengjia:@localhost:5432/school_management"
```

5.3.测试数据库连接
```
pnpm run migrate
```

6. 查看数据库
```
pnpm run prisma:studio 
```
它将打开一个新标签页：http://localhost:5555

7. 运行项目
返回到根目录，运行所有项目
```
pnpm run dev
```
打开浏览器，访问 http://localhost:3000

## 如何使用项目
1. 教师管理
1.1. 查看教师列表
1.2. 创建新教师

2. 班级管理
2.1. 查看班级列表
2.2. 创建新班级