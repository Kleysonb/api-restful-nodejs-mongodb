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

-------

## Run

- watching bash 1: tsc -w
- watching bash 3 (mongo): ./mongod --dbpath=../../data/db/
- watching bash 2: nodemon dist/main.js