# Summary

- [About](#about)
- [Quick Start](#start)
- [Built using](#built_using)

# About <a id="about"></a>

This project is an API built with NestJs and Prisma, that simulates a fictional medical clinic appointment management system named AttaMed.

# Quick Start <a id="start"></a>

## Clone the repository:
```bash
git clone https://github.com/cbravos5/atta-med-api.git
```
or
```bash
git clone git@github.com:cbravos5/atta-med-api.git
```

## CD into reposory folder and install the app packages:
```bash
npm install
```
or
```bash
yarn
```

## Start the PostgreSQL container

This project uses a PostgreSQL container as DB.

To create the container just run:
```bash
docker compose up -d
```

*If you dont have Docker or Docker Compose intalled, follow the instructions in [here](https://docs.docker.com/get-docker/) to install.*

Once the container is up and running, the PostgreSQL could be accessed through the mapped port 5432.

## Set the enviroment variables:

Create a **.env** file according to the example in **.env.example**

## Run migrations and seed

```bash
npm run migration:run && npm run seed
```
or
```bash
yarn migration:run && yarn seed 
```
## Start the app in development mode:
```bash
npm run start:dev
```
or
```bash
yarn start:dev
```

## Usage
The default app URL is http://localhost:3001.

Access http://localhost:3001/api and find out all the routes with the Swagger page.

The default user registered in the API is:

```
email: email@attamed.com
senha: attamed123
```

Login and have fun exploring the app :)

## Built using <a id="built_using"></a>

- [NestJs](https://nestjs.com/) - Framework
- [Typescript](https://www.typescriptlang.org/) - Main language
- [Prisma](https://www.prisma.io/) - ORM
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Docker | Docker Compose](https://www.docker.com/) - Containerization