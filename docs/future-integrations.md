# Carvaan — Future Integrations Roadmap

This document describes how each real-world integration will be connected once the platform moves from demo to production.

---

## 1. Instagram Graph API

**Purpose:** Pull real creator metrics, audience demographics, and post performance.

**Implementation plan:**
- Register a Meta Business App
- Implement OAuth flow for creator Instagram Business/Creator accounts
- Store access tokens in `creator_social_accounts` table (encrypted)
- Scheduled job (every 24h) to sync follower count, engagement rate, recent posts
- Webhook listener for new post notifications

**Required permissions:** `instagram_basic`, `instagram_manage_insights`, `pages_read_engagement`

**Files to update:** `/src/lib/instagram.ts`, `/src/app/api/creator/sync-instagram/route.ts`

---

## 2. TikTok Developer API

**Purpose:** Sync TikTok creator stats and video performance.

**Implementation plan:**
- Register TikTok app via TikTok for Developers
- OAuth 2.0 flow for creator account authorization
- Sync video views, likes, shares, follower count per creator
- Store encrypted access tokens

**Required scopes:** `user.info.basic`, `video.list`, `research.adlib.basic`

**Files to update:** `/src/lib/tiktok.ts`, `/src/app/api/creator/sync-tiktok/route.ts`

---

## 3. YouTube Data API v3

**Purpose:** Sync YouTube channel stats and video performance for creator profiles.

**Implementation plan:**
- Enable YouTube Data API in Google Cloud Console
- OAuth 2.0 integration with Google account
- Sync channel subscribers, video views, average watch time
- Scheduled daily sync per creator

**Files to update:** `/src/lib/youtube.ts`

---

## 4. WhatsApp Cloud API (Meta)

**Purpose:** Enable in-platform WhatsApp messaging for outreach and creator communication.

**Implementation plan:**
- Set up WhatsApp Business Platform via Meta for Developers
- Pre-approved message templates for initial outreach, follow-ups, reminders
- Link WhatsApp messages to outreach records in the platform
- Log all sent messages in `outreach_logs` table

**Note:** WhatsApp messages require pre-approved templates for marketing use

**Files to update:** `/src/lib/whatsapp.ts`, `/src/components/dashboard/outreach/message-send.tsx`

---

## 5. Gmail API / Google Workspace

**Purpose:** Send outreach emails directly from the agency's work email.

**Implementation plan:**
- OAuth 2.0 with Google to authorize agency Gmail accounts
- Use Gmail API `messages.send` endpoint for outreach emails
- BCC all outbound emails to a log address for thread tracking
- Parse replies (webhook or polling) and update outreach status

**Files to update:** `/src/lib/gmail.ts`

---

## 6. Stripe (Payment Processing)

**Purpose:** Enable brand subscription billing and optional creator payout processing.

**Implementation plan:**
- Set up Stripe account with Products/Prices matching the 4 subscription tiers
- Stripe Checkout for subscription signup flow
- Webhooks for `invoice.paid`, `customer.subscription.updated`, `payment_failed`
- For creator payouts: Stripe Connect Express accounts per creator
- Store `stripe_customer_id` on `organizations` and `stripe_account_id` on `creators`

**Files to update:** `/src/lib/stripe.ts`, `/src/app/api/webhooks/stripe/route.ts`

---

## 7. OpenAI API

**Purpose:** Enhance the Brief Generator, Brand Fit Scorer, and Hashtag Analyzer with real AI.

**Implementation plan:**
- Replace rule-based scoring with GPT-4o completions
- Brief Generator: structured prompt with campaign data → formatted brief
- Brand Fit Checker: AI analysis of niche/audience overlap with reasoning
- Hashtag Analyzer: real-time trend-informed hashtag recommendations
- Content caption review: AI grammar/tone check on submitted captions

**Model:** `gpt-4o` for generation, `gpt-4o-mini` for classification tasks

**Files to update:** `/src/lib/openai.ts`, all `/src/app/(public)/tools/*` pages, `/src/app/dashboard/agency/briefs/page.tsx`

---

## 8. PostgreSQL + Prisma ORM

**Purpose:** Replace dummy data files with a real persistent database.

**Implementation plan:**
- Install `@prisma/client` and `prisma`
- Create `prisma/schema.prisma` based on `/docs/database-schema.md`
- Configure `DATABASE_URL` in `.env` pointing to PostgreSQL instance (Neon/Supabase/Railway)
- Run `prisma migrate dev --name init` to create tables
- Replace all `/src/data/*.ts` imports with Prisma queries in Server Components
- Add Prisma Client singleton pattern in `/src/lib/db.ts`

**Environment variables needed:** `DATABASE_URL`, `DIRECT_URL` (if using pooling)

---

## 9. Cloudinary / AWS S3

**Purpose:** Store creator profile images and content submission assets.

**Implementation plan:**
- For content submissions: presigned upload URLs via S3 or Cloudinary upload widget
- Store returned asset URL in `content_submissions.asset_url`
- For creator profiles: resize and optimize profile images on upload
- CDN delivery via Cloudinary transformations or CloudFront

**Files to update:** `/src/lib/upload.ts`, content submission form components

---

## 10. Real Authentication (NextAuth.js or Supabase Auth)

**Purpose:** Replace demo role switching with real secure authentication.

**Implementation plan:**
- Install `next-auth` v5 or use Supabase Auth
- Configure providers: Email/Password, Google OAuth
- JWT sessions with role stored in token
- Middleware to protect `/dashboard/*` routes based on user role
- Remove `/src/lib/auth.ts` demo utilities
- Add proper session management and CSRF protection

**Files to update:** `/src/app/api/auth/[...nextauth]/route.ts`, `/middleware.ts`

---

## Environment Variables Checklist

```env
# Database
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...

# Authentication
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Social APIs
INSTAGRAM_APP_ID=
INSTAGRAM_APP_SECRET=
TIKTOK_CLIENT_KEY=
TIKTOK_CLIENT_SECRET=
YOUTUBE_API_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Messaging
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_VERIFY_TOKEN=

# Payments
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PUBLISHABLE_KEY=

# AI
OPENAI_API_KEY=

# Storage
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET=
```
