# API Restful with Node.js

## Initial

```bash
npm init -y
npm i typescript (-g)
npm i restify@6.3.4 --save -E
npm i @types/restify@5.0.6 -D -E

new file: tsconfig.json
new file: main.ts

npm install nodemon -g
```

## tests

```bash
npm i jest@22.4.2 ts-jest@22.0.4 typescript@2.6.2 supertest@3.0.0 @types/jest@22.1.2 @types/supertest@2.0.4 -D -E
```

-------

## Run

- watching bash 1: tsc -w
- watching bash 3 (mongo): ./mongod --dbpath=../../data/db/
- watching bash 2: nodemon dist/main.js