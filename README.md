# Bazar Dor

A price tracking web application for essential commodities in Bangladesh — rice, lentils, oil, vegetables, fish, meat, eggs, dairy and spices. Track today's prices across markets, compare price changes, and explore products by category.

**Live:** https://assignment7-prb-14.vercel.app
**Repository:** https://github.com/sm-sayem-hossain/Assignment7-PRB14

## Technologies

- Next.js 16 (App Router), TypeScript
- Tailwind CSS
- BetterAuth + MongoDB Atlas
- react-hot-toast
- Bazar Dor API (products and market prices)

## Features

1. **Price Dashboard** — Top risers and fallers sections, full product grid with price change badges, Bengali numerals, and a scrolling price ticker.

2. **Product Details (Protected Route)** — Minimum, maximum and average price summary, per-market price table for 12 markets, and daily comparison. Requires sign in; redirects with a toast and returns after login.

3. **Category Page with Sorting** — Filter products by category, sort by price (low to high, high to low) using numeric values, with skeleton loading and a friendly 404 for invalid categories.

4. **Authentication** — Email/password sign up and sign in plus Google and GitHub social login, built with BetterAuth and MongoDB. Toast notifications for auth events and protected route redirects.

5. **My Profile** — Protected profile page with user info, sign out, and name update form that reflects instantly in the navbar.

## Getting Started

```bash
git clone https://github.com/sm-sayem-hossain/Assignment7-PRB14.git
cd Assignment7-PRB14
npm install
npm run dev
```

Environment variables required in `.env`:

```
DATABASE_URL
BETTER_AUTH_SECRET
BETTER_AUTH_URL
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET
```
