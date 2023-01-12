## Description

This is the API layer.

## Requirements
- `docker` version 20.10.*
- `docker-compose` version 2.13.*
- `nodejs`version 16.19.*
- `yarn` version 1.22.*

## Setup env variable
- copy `.env.example` file and name it `.env` or you can just run `yarn prepare` if you are in `unix` environment. That command might not work on windows.

## Installation

```bash
$ yarn install
```

## Setting up development environment
- `docker-compose up -d` to run `pgsql`, `redis` and `adminer`.

## Run database migration
- `yarn prisma migrate dev` to run all the migration.
- `yarn prisma db seed` to run all seeding.
- `yarn prisma generate` to generate prisma client objects.
- `restart your ts server` if an error is showing on your vscode. (OPTIONAL - not need this step for just running from terminal)

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```
