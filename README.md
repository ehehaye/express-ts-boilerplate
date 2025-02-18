# express-ts-boilerplate

A TS express boilerplate using typedi and routing-controllers.

## Pre-configuration

- Dotenv support
- Commonly used middlewares
  - CORS
  - DDos protection
  - Gzip
  - HTTP log
  - Global error handler
  - Attachment upload

## Dev

```bash
git clone https://github.com/ehehaye/express-ts-boilerplate.git
cd express-ts-boilerplate
pnpm i
pnpm dev
```

## API Example

- POST [localhost:9000/files/upload/md](./src/controllers/FilesController.ts)

## Notes

You are supposed to import database configuration and logic by yourself.

It's recommended to process DB Logic in Services instead of Controllers.

More use DTO to verify incoming data.

## Structure

```text
├── bundle ------------------- TS output dir
├── logs --------------------- log4js output dir
├── nodemon.json
├── package-lock.json
├── package.json
├── shell -------------------- Start script
├── src
│   ├── controllers ---------- MVC - Controllers
│   ├── dto ------------------ Data Transfer Object
│   ├── exceptions ----------- Custom exceptions
│   ├── index.ts ------------- Entry file
│   ├── middlewares ---------- Express middlewares
│   ├── services ------------- MVC - Services
│   ├── utils ---------------- TS functions
├── uploads ------------------ Attachment upload dir
├── tsconfig.json
└── types
```

## References

- [routing-controllers](https://github.com/typestack/routing-controllers)
- [typedi](https://github.com/typestack/typedi)
- [multer](https://github.com/expressjs/multer)
- [express](https://expressjs.com/)
