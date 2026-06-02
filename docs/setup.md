# Carvaan — Setup Guide

## Prerequisites
- Node.js 20+
- npm or yarn

## Quick Start

```bash
# Clone / navigate to project
cd carvaan

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Demo Access

Visit `/login` and use one of the quick-access role buttons:

| Role | Email | Password | Dashboard |
|------|-------|----------|-----------|
| Super Admin | admin@carvaan.io | admin2025 | /dashboard/admin |
| Agency | agency@maqsaddemo.ae | agency2025 | /dashboard/agency |
| Brand | brand@gleamdemo.com | brand2025 | /dashboard/brand |
| Creator | creator@carvaan.io | creator2025 | /dashboard/creator |

## Project Structure

```
src/
├── app/
│   ├── (public)/          # Public website pages
│   │   ├── page.tsx       # Home page
│   │   ├── brands/        # For Brands page
│   │   ├── agencies/      # For Agencies page
│   │   ├── creators/      # For Creators page
│   │   ├── pricing/       # Pricing page
│   │   ├── tools/         # Free tools
│   │   ├── login/         # Login page
│   │   ├── signup/        # Signup page
│   │   └── reset-password/
│   └── dashboard/
│       ├── admin/         # Super admin dashboard
│       ├── agency/        # Agency dashboard
│       │   ├── page.tsx   # Overview
│       │   ├── campaigns/ # Campaign management
│       │   ├── discovery/ # Creator discovery
│       │   ├── shortlists/
│       │   ├── outreach/  # Kanban pipeline
│       │   ├── content/   # Content approval
│       │   ├── briefs/    # Brief generator
│       │   ├── analytics/ # Performance analytics
│       │   ├── reports/   # Campaign reports
│       │   ├── payments/  # Creator payments
│       │   └── team/
│       ├── brand/         # Brand dashboard
│       └── creator/       # Creator dashboard
├── components/
│   ├── public/            # Public website components
│   ├── dashboard/         # Dashboard components
│   └── ui/               # Reusable UI primitives
├── data/                  # Dummy data files
│   ├── creators.ts        # 30 GCC creators
│   ├── campaigns.ts       # 12 campaigns
│   ├── brands.ts          # 8 brands
│   ├── agencies.ts        # 4 agencies
│   ├── payments.ts        # 20 payment records
│   ├── outreach.ts        # 30 outreach records
│   ├── content.ts         # 20 content submissions
│   ├── performance.ts     # 25 performance metrics
│   ├── notifications.ts   # 15 notifications
│   └── reports.ts         # 10 reports
├── lib/
│   ├── utils.ts           # Utility functions
│   └── auth.ts            # Demo auth (localStorage)
└── types/
    └── index.ts           # TypeScript types

docs/
├── setup.md               # This file
├── database-schema.md     # Full PostgreSQL schema
└── future-integrations.md # Integration roadmap
```

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Charts:** Recharts
- **Icons:** Lucide React
- **UI Primitives:** Radix UI

## Key Features Built

### Public Website
- Home page with hero, features, analytics preview, testimonials, FAQ
- For Brands, Agencies, Creators marketing pages
- Pricing page with plan comparison table
- Free tools (Engagement Calculator, Brand Fit Checker, Authenticity Checker, Hashtag Analyzer)
- Login, Signup, Reset Password pages

### Dashboards
- **Admin:** Platform overview with charts and activity feed
- **Agency:** Overview, Creator Discovery, Campaigns, Outreach Pipeline (Kanban), Content Approval, Brief Generator, Analytics, Reports, Payments, Team, Clients
- **Brand:** Overview with campaign progress and reach trend
- **Creator:** Overview with earnings chart, opportunities, content submissions

### Core Modules
- Creator discovery with search and multi-filter
- Creator profile modal with full metrics
- Outreach Kanban pipeline
- Content approval with approve/revision/reject flow
- Brief generator with live preview
- Analytics with Recharts charts
- Payment tracking with approve/mark-paid flow
- Campaign report previews with chart

## Connecting the Backend

See `docs/future-integrations.md` for the full integration roadmap covering:
- PostgreSQL + Prisma setup
- Instagram, TikTok, YouTube APIs
- WhatsApp Cloud API
- Stripe payments
- OpenAI API
- Real authentication with NextAuth.js
