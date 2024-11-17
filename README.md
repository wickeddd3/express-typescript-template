# express-typescript-template

#### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Prisma

```bash
# sync prisma schema to your db
npx prisma db push

# update your @prisma/client (run this everytime you update your prisma schema)
npx prisma generate

# run prisma studio on http://localhost:5000
npx prisma studio
```