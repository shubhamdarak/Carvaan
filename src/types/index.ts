export type UserRole = "admin" | "agency" | "brand" | "creator";

export type CreatorStatus = "pending" | "approved" | "rejected" | "suspended";
export type VerificationStatus = "verified" | "not_verified" | "under_review";

export type CampaignStatus =
  | "draft"
  | "brief_created"
  | "scouting"
  | "shortlisted"
  | "outreach_started"
  | "negotiation"
  | "awaiting_approval"
  | "awaiting_content"
  | "content_submitted"
  | "revision_requested"
  | "content_approved"
  | "scheduled"
  | "live"
  | "tracking"
  | "completed"
  | "cancelled";

export type OutreachStatus =
  | "not_contacted"
  | "contacted"
  | "follow_up"
  | "replied"
  | "interested"
  | "negotiating"
  | "accepted"
  | "rejected"
  | "no_response"
  | "confirmed";

export type ContentStatus =
  | "submitted"
  | "under_review"
  | "revision_requested"
  | "approved"
  | "rejected"
  | "posted";

export type PaymentStatus =
  | "pending"
  | "approved"
  | "processing"
  | "paid"
  | "on_hold"
  | "disputed"
  | "cancelled";

export type NegotiationStatus =
  | "not_started"
  | "in_discussion"
  | "offer_sent"
  | "accepted"
  | "rejected"
  | "on_hold";

export type Platform = "instagram" | "tiktok" | "youtube" | "snapchat";

export type Niche =
  | "Beauty"
  | "Fashion"
  | "Fitness"
  | "Food"
  | "Travel"
  | "Automotive"
  | "Real Estate"
  | "Lifestyle"
  | "Parenting"
  | "Technology"
  | "Health & Wellness"
  | "Luxury"
  | "Hospitality"
  | "Education"
  | "Finance";

export interface Creator {
  id: string;
  fullName: string;
  displayName: string;
  email: string;
  phone?: string;
  country: string;
  city: string;
  nationality: string;
  languages: string[];
  gender: "male" | "female" | "other";
  niche: Niche;
  bio: string;
  profileImage?: string;
  instagramHandle?: string;
  tiktokHandle?: string;
  youtubeChannel?: string;
  snapchatHandle?: string;
  followerCount: number;
  averageViews: number;
  engagementRate: number;
  audienceGenderSplit: { female: number; male: number };
  audienceAgeSplit: { "18-24": number; "25-34": number; "35-44": number; "45+": number };
  topAudienceCountries: string[];
  contentCategories: string[];
  pastCollaborations: string[];
  ratePerPost: number;
  ratePerReel: number;
  ratePerStory: number;
  ratePerTikTok: number;
  ratePerYouTubeVideo: number;
  acceptsGiftCollabs: boolean;
  acceptsCouponCollabs: boolean;
  status: CreatorStatus;
  verificationStatus: VerificationStatus;
  brandFitScore: number;
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
  primaryPlatform: Platform;
}

export interface Brand {
  id: string;
  name: string;
  industry: string;
  country: string;
  website?: string;
  logo?: string;
  description: string;
  contactName: string;
  contactEmail: string;
  activeCampaigns: number;
  totalSpend: number;
  createdAt: string;
}

export interface Agency {
  id: string;
  name: string;
  country: string;
  description: string;
  contactName: string;
  contactEmail: string;
  totalClients: number;
  activeCampaigns: number;
  teamSize: number;
  createdAt: string;
}

export interface Campaign {
  id: string;
  campaignName: string;
  clientName: string;
  brandName: string;
  objective: string;
  campaignType: string;
  platforms: Platform[];
  targetLocation: string;
  targetAudience: string;
  creatorRequirements: string;
  deliverables: string[];
  contentGuidelines: string;
  hashtags: string[];
  mentionRequirements: string;
  landingPageLink?: string;
  couponCode?: string;
  utmLink?: string;
  budget: number;
  creatorBudget: number;
  startDate: string;
  endDate: string;
  contentDeadline: string;
  postingWindow: string;
  kpiTargets: {
    reach?: number;
    impressions?: number;
    engagement?: number;
    clicks?: number;
    conversions?: number;
  };
  status: CampaignStatus;
  assignedTeamMember: string;
  createdAt: string;
  updatedAt: string;
  agencyId: string;
  brandId: string;
}

export interface OutreachRecord {
  id: string;
  creatorId: string;
  creatorName: string;
  campaignId: string;
  campaignName: string;
  contactChannel: "whatsapp" | "email" | "instagram" | "phone";
  lastMessagePreview: string;
  lastContactedDate: string;
  nextFollowUpDate?: string;
  rateProposed: number;
  rateAgreed?: number;
  notes?: string;
  status: OutreachStatus;
}

export interface ContentSubmission {
  id: string;
  creatorId: string;
  creatorName: string;
  campaignId: string;
  campaignName: string;
  contentType: "reel" | "post" | "story" | "tiktok" | "youtube" | "snapchat";
  caption: string;
  hashtags: string[];
  postConcept: string;
  notes?: string;
  submittedDate: string;
  status: ContentStatus;
  reviewComments?: string;
}

export interface PerformanceMetric {
  id: string;
  creatorId: string;
  creatorName: string;
  campaignId: string;
  campaignName: string;
  platform: Platform;
  postUrl?: string;
  publishedDate: string;
  views: number;
  reach: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  clicks: number;
  couponRedemptions: number;
  leads: number;
  sales: number;
  revenue: number;
  cost: number;
  costPerView: number;
  costPerClick: number;
  costPerLead: number;
  engagementRate: number;
  roi: number;
  roas: number;
}

export interface Payment {
  id: string;
  creatorId: string;
  creatorName: string;
  campaignId: string;
  campaignName: string;
  deliverable: string;
  agreedAmount: number;
  bonusAmount: number;
  deductions: number;
  totalAmount: number;
  status: PaymentStatus;
  paymentDueDate: string;
  paymentMethod: string;
  invoiceStatus: "pending" | "sent" | "approved" | "paid";
  notes?: string;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  fullName: string;
  email: string;
  role: "owner" | "campaign_manager" | "creator_manager" | "content_reviewer" | "analyst";
  assignedCampaigns: number;
  taskCount: number;
  status: "active" | "inactive";
  joinedAt: string;
}

export interface Notification {
  id: string;
  type:
    | "creator_signup"
    | "creator_applied"
    | "content_submitted"
    | "revision_requested"
    | "content_approved"
    | "campaign_live"
    | "performance_updated"
    | "payment_pending"
    | "payment_completed"
    | "follow_up_due";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  relatedId?: string;
}

export interface Report {
  id: string;
  campaignId: string;
  campaignName: string;
  clientName: string;
  generatedAt: string;
  status: "draft" | "ready" | "shared";
  totalReach: number;
  totalViews: number;
  totalEngagement: number;
  totalClicks: number;
  totalConversions: number;
  roi: number;
  creatorCount: number;
  deliverableCount: number;
}
