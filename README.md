· English · [中文](./README-zh_CN.md)

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