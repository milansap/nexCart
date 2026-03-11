# NexCart

A modern, full-featured e-commerce storefront built with Next.js 16, React 19, and Tailwind CSS v4. Powered by the [Fake Store API](https://fakestoreapi.com).

## Features

- Product listing with filtering and pagination
- Product detail pages
- Shopping cart (client-side, persisted via context)
- User authentication (login/logout with JWT stored in cookies)
- Protected dashboard route
- Responsive design with Tailwind CSS v4 and shadcn/ui components
- Static sitemap at `/sitemap.xml`

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4, shadcn/ui |
| State | Zustand (auth), React Context (cart) |
| Forms | React Hook Form + Zod |
| API | Fake Store API |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/milansap/nexCart.git
cd nexCart
npm install
```

### Environment Variables

Create a `.env` file in the root of the project:

```env
NEXT_PUBLIC_API_URL=https://fakestoreapi.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> For production deployments (e.g. Vercel), add these variables under **Settings → Environment Variables**.

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/
│   ├── (auth)/login/       # Login page
│   ├── apis/               # API layer (interceptor + resource functions)
│   ├── cart/               # Cart page
│   ├── dashboard/          # Protected dashboard
│   ├── products/           # Product listing + detail pages
│   ├── sitemap.ts          # Static sitemap
│   ├── layout.tsx
│   └── page.tsx            # Homepage
├── components/
│   ├── cart/
│   ├── layout/             # Header
│   ├── pagination/
│   ├── products/
│   └── ui/                 # shadcn/ui primitives
├── context/
│   └── cart-context.tsx
└── lib/
    ├── authStore.ts        # Zustand auth store
    ├── cookies.ts
    └── zodScheme.ts        # Form validation schemas
```

## Deployment

The project is configured for deployment on [Vercel](https://vercel.com). Push to the `main` branch to trigger a production deploy.

Make sure `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_SITE_URL` are set in your Vercel project environment variables before deploying.
