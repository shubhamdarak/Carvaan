# Carvaan — Database Schema

This document describes the intended PostgreSQL/Prisma schema for the Carvaan platform.
All tables below map directly to the TypeScript types in `/src/types/index.ts`.

---

## Core Tables

### users
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| email | varchar(255) UNIQUE | |
| password_hash | varchar | bcrypt |
| role | enum(admin,agency,brand,creator) | |
| full_name | varchar | |
| organization_id | uuid FK | references organizations |
| is_active | boolean | default true |
| created_at | timestamptz | |
| updated_at | timestamptz | |

### organizations
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| name | varchar | |
| type | enum(agency,brand) | |
| country | varchar | |
| created_at | timestamptz | |

### brands
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| name | varchar | |
| industry | varchar | |
| country | varchar | |
| website | varchar | nullable |
| contact_name | varchar | |
| contact_email | varchar | |
| created_at | timestamptz | |

### agencies
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| name | varchar | |
| country | varchar | |
| contact_name | varchar | |
| contact_email | varchar | |
| created_at | timestamptz | |

---

## Creator Tables

### creators
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| user_id | uuid FK | references users |
| full_name | varchar | |
| display_name | varchar | |
| email | varchar | |
| phone | varchar | nullable |
| country | varchar | |
| city | varchar | |
| nationality | varchar | |
| gender | enum(male,female,other) | |
| niche | varchar | |
| bio | text | |
| status | enum(pending,approved,rejected,suspended) | default pending |
| verification_status | enum(verified,not_verified,under_review) | |
| brand_fit_score | integer | 0–100 |
| accepts_gift_collabs | boolean | |
| accepts_coupon_collabs | boolean | |
| internal_notes | text | nullable |
| created_at | timestamptz | |
| updated_at | timestamptz | |

### creator_social_accounts
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| creator_id | uuid FK | references creators |
| platform | enum(instagram,tiktok,youtube,snapchat) | |
| handle | varchar | |
| follower_count | integer | |
| average_views | integer | |
| engagement_rate | decimal(5,2) | |
| is_primary | boolean | |
| verified_at | timestamptz | nullable |

### creator_audience_demographics
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| creator_id | uuid FK | |
| female_pct | decimal(5,2) | |
| male_pct | decimal(5,2) | |
| age_18_24 | decimal(5,2) | |
| age_25_34 | decimal(5,2) | |
| age_35_44 | decimal(5,2) | |
| age_45_plus | decimal(5,2) | |
| top_countries | json | string[] |
| updated_at | timestamptz | |

### creator_pricing
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| creator_id | uuid FK | |
| rate_per_post | integer | AED |
| rate_per_reel | integer | |
| rate_per_story | integer | |
| rate_per_tiktok | integer | |
| rate_per_youtube_video | integer | |
| updated_at | timestamptz | |

---

## Campaign Tables

### campaigns
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| campaign_name | varchar | |
| agency_id | uuid FK | references agencies |
| brand_id | uuid FK | references brands |
| objective | varchar | |
| campaign_type | varchar | |
| platforms | varchar[] | |
| target_location | varchar | |
| target_audience | text | |
| creator_requirements | text | |
| content_guidelines | text | |
| hashtags | varchar[] | |
| mention_requirements | varchar | |
| landing_page_link | varchar | nullable |
| coupon_code | varchar | nullable |
| utm_link | varchar | nullable |
| budget | integer | |
| creator_budget | integer | |
| start_date | date | |
| end_date | date | |
| content_deadline | date | |
| posting_window | varchar | |
| kpi_reach | integer | nullable |
| kpi_impressions | integer | nullable |
| kpi_engagement | integer | nullable |
| kpi_clicks | integer | nullable |
| kpi_conversions | integer | nullable |
| status | enum(draft,...,cancelled) | |
| assigned_team_member | varchar | |
| created_at | timestamptz | |
| updated_at | timestamptz | |

### campaign_deliverables
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| campaign_id | uuid FK | |
| type | varchar | reel, post, story, etc. |
| quantity | integer | |
| platform | varchar | |
| description | text | nullable |

### campaign_creators
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| campaign_id | uuid FK | |
| creator_id | uuid FK | |
| status | enum(shortlisted,approved,rejected,confirmed) | |
| agreed_rate | integer | nullable |
| added_at | timestamptz | |

---

## Workflow Tables

### shortlists
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| campaign_id | uuid FK | |
| creator_id | uuid FK | |
| status | enum(under_review,approved,rejected) | |
| notes | text | nullable |
| added_by | uuid FK | references users |
| created_at | timestamptz | |

### outreach_logs
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| campaign_id | uuid FK | |
| creator_id | uuid FK | |
| contact_channel | enum(whatsapp,email,instagram,phone) | |
| last_message_preview | text | |
| last_contacted_date | timestamptz | |
| next_follow_up_date | timestamptz | nullable |
| rate_proposed | integer | |
| rate_agreed | integer | nullable |
| status | enum(not_contacted,...,confirmed) | |
| notes | text | nullable |
| created_at | timestamptz | |

### negotiation_records
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| campaign_id | uuid FK | |
| creator_id | uuid FK | |
| asking_price | integer | |
| brand_budget | integer | |
| proposed_offer | integer | |
| final_agreed_amount | integer | nullable |
| bonus_condition | text | nullable |
| deliverables_agreed | text | |
| usage_rights | text | |
| revision_rounds | integer | default 2 |
| payment_terms | text | |
| status | enum(not_started,...,on_hold) | |
| notes | text | nullable |
| created_at | timestamptz | |

### briefs
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| campaign_id | uuid FK | |
| content | text | full brief markdown |
| version | integer | default 1 |
| created_by | uuid FK | references users |
| created_at | timestamptz | |

### content_submissions
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| campaign_id | uuid FK | |
| creator_id | uuid FK | |
| content_type | enum(reel,post,story,tiktok,youtube,snapchat) | |
| asset_url | varchar | nullable — Cloudinary/S3 |
| caption | text | |
| hashtags | varchar[] | |
| post_concept | text | |
| notes | text | nullable |
| submitted_date | timestamptz | |
| status | enum(submitted,...,posted) | |
| review_comments | text | nullable |
| reviewed_by | uuid FK | nullable references users |
| reviewed_at | timestamptz | nullable |

### content_comments
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| submission_id | uuid FK | |
| user_id | uuid FK | |
| comment | text | |
| created_at | timestamptz | |

---

## Performance and Payments

### performance_metrics
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| campaign_id | uuid FK | |
| creator_id | uuid FK | |
| platform | varchar | |
| post_url | varchar | nullable |
| published_date | date | |
| views | integer | |
| reach | integer | |
| likes | integer | |
| comments | integer | |
| shares | integer | |
| saves | integer | |
| clicks | integer | |
| coupon_redemptions | integer | |
| leads | integer | |
| sales | integer | |
| revenue | decimal(10,2) | |
| cost | decimal(10,2) | |
| engagement_rate | decimal(5,2) | |
| roi | decimal(6,2) | |
| roas | decimal(6,2) | |
| recorded_at | timestamptz | |

### payments
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| campaign_id | uuid FK | |
| creator_id | uuid FK | |
| deliverable | varchar | |
| agreed_amount | integer | |
| bonus_amount | integer | default 0 |
| deductions | integer | default 0 |
| total_amount | integer | computed |
| status | enum(pending,...,cancelled) | |
| payment_due_date | date | |
| payment_method | varchar | |
| invoice_status | enum(pending,sent,approved,paid) | |
| proof_of_payment_url | varchar | nullable |
| notes | text | nullable |
| created_at | timestamptz | |

### coupon_codes
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| campaign_id | uuid FK | |
| creator_id | uuid FK | nullable |
| code | varchar UNIQUE | |
| discount_pct | integer | |
| usage_count | integer | default 0 |
| revenue_generated | decimal(10,2) | |
| created_at | timestamptz | |

---

## System Tables

### reports
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| campaign_id | uuid FK | |
| status | enum(draft,ready,shared) | |
| content | jsonb | full report data |
| generated_by | uuid FK | references users |
| generated_at | timestamptz | |
| shared_at | timestamptz | nullable |

### team_members
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| agency_id | uuid FK | |
| user_id | uuid FK | |
| role | enum(owner,...,analyst) | |
| status | enum(active,inactive) | |
| joined_at | timestamptz | |

### notifications
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| user_id | uuid FK | |
| type | varchar | |
| title | varchar | |
| message | text | |
| read | boolean | default false |
| related_id | uuid | nullable |
| created_at | timestamptz | |

### activity_logs
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| user_id | uuid FK | |
| action | varchar | |
| entity_type | varchar | |
| entity_id | uuid | |
| details | jsonb | nullable |
| created_at | timestamptz | |

### subscription_plans
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| name | varchar | Starter, Growth, Business, Enterprise |
| price_monthly | integer | USD cents |
| price_annual | integer | |
| features | jsonb | |
| is_active | boolean | |

### invoices
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| organization_id | uuid FK | |
| plan_id | uuid FK | |
| amount | integer | |
| status | enum(pending,paid,failed) | |
| billing_period_start | date | |
| billing_period_end | date | |
| paid_at | timestamptz | nullable |
| created_at | timestamptz | |
