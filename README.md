This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.




# DocSpace

DocSpace is a lightweight collaborative document editor inspired by Google Docs.

## Live Demo

https://docspace-woad.vercel.app

## Features

- Create documents
- Rename documents
- Rich-text editing
- Bold, italic and underline
- Headings
- Bulleted and numbered lists
- Save and reopen documents
- Import .txt files
- Share documents with another user
- Owned/shared document visibility
- MongoDB persistence
- Automated testing
- Vercel deployment

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Tiptap
- MongoDB
- Jest
- React Testing Library
- Vercel

## Local Setup

Clone the repository:

git clone https://github.com/Krisha-Kansara/docspace.git

Install dependencies:

npm install

Create `.env.local`:

MONGODB_URI=your_mongodb_connection_string

Run:

npm run dev

Open:

http://localhost:3000

## Testing

Run:

npm test

## Supported File Import

Currently supported:

- `.txt`

The uploaded text file is converted into a new editable document.

## Demo Users

The assignment uses lightweight seeded/mock users:

- user-1 — Krisha
- user-2 — Shared User

## Scope

This project intentionally focuses on the core document workflow rather than attempting to recreate the full Google Docs feature set.
