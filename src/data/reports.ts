import type { Report } from "@/types";

export const reports: Report[] = [
  { id: "r001", campaignId: "camp001", campaignName: "Gleam Radiance Launch", clientName: "Gleam Skincare", generatedAt: "2025-02-20T10:00:00Z", status: "shared", totalReach: 538000, totalViews: 701000, totalEngagement: 64390, totalClicks: 14700, totalConversions: 460, roi: 152, creatorCount: 3, deliverableCount: 10 },
  { id: "r002", campaignId: "camp002", campaignName: "Sands & Co. Ramadan Edit", clientName: "Sands & Co.", generatedAt: "2025-04-05T14:00:00Z", status: "shared", totalReach: 722000, totalViews: 1135000, totalEngagement: 84880, totalClicks: 17600, totalConversions: 405, roi: 177, creatorCount: 3, deliverableCount: 11 },
  { id: "r003", campaignId: "camp009", campaignName: "ProGear Back to Gym", clientName: "ProGear Arabia", generatedAt: "2025-05-22T09:00:00Z", status: "ready", totalReach: 486000, totalViews: 597000, totalEngagement: 44770, totalClicks: 9600, totalConversions: 615, roi: 209, creatorCount: 2, deliverableCount: 6 },
  { id: "r004", campaignId: "camp004", campaignName: "AutoEdge Detailing Campaign", clientName: "AutoEdge KSA", generatedAt: "2025-05-15T11:00:00Z", status: "ready", totalReach: 499000, totalViews: 650000, totalEngagement: 36290, totalClicks: 16500, totalConversions: 637, roi: 151, creatorCount: 2, deliverableCount: 7 },
  { id: "r005", campaignId: "camp003", campaignName: "ProGear Protein Series", clientName: "ProGear Arabia", generatedAt: "2025-05-10T10:00:00Z", status: "draft", totalReach: 193000, totalViews: 243000, totalEngagement: 19640, totalClicks: 5300, totalConversions: 430, roi: 0, creatorCount: 2, deliverableCount: 9 },
  { id: "r006", campaignId: "camp005", campaignName: "NestHQ Living Series", clientName: "NestHQ", generatedAt: "2025-05-28T08:00:00Z", status: "draft", totalReach: 98000, totalViews: 128000, totalEngagement: 13820, totalClicks: 2800, totalConversions: 85, roi: 0, creatorCount: 1, deliverableCount: 4 },
  { id: "r007", campaignId: "camp006", campaignName: "Vertex Realty Q2 Push", clientName: "Vertex Realty", generatedAt: "2025-05-28T09:00:00Z", status: "draft", totalReach: 117000, totalViews: 147000, totalEngagement: 9960, totalClicks: 5600, totalConversions: 110, roi: 0, creatorCount: 2, deliverableCount: 5 },
  { id: "r008", campaignId: "camp011", campaignName: "Gulf Influence Tech Month", clientName: "TechZone GCC", generatedAt: "2025-05-28T10:00:00Z", status: "draft", totalReach: 268000, totalViews: 305000, totalEngagement: 19840, totalClicks: 12200, totalConversions: 384, roi: 150, creatorCount: 2, deliverableCount: 5 },
  { id: "r009", campaignId: "camp007", campaignName: "Nahdi Wellness Month", clientName: "Nahdi Care", generatedAt: "2025-05-25T11:00:00Z", status: "draft", totalReach: 58000, totalViews: 72000, totalEngagement: 7220, totalClicks: 1800, totalConversions: 0, roi: 0, creatorCount: 2, deliverableCount: 5 },
  { id: "r010", campaignId: "camp008", campaignName: "Qasr Al Helou Eid Collection", clientName: "Qasr Al Helou", generatedAt: "2025-05-28T12:00:00Z", status: "draft", totalReach: 0, totalViews: 0, totalEngagement: 0, totalClicks: 0, totalConversions: 0, roi: 0, creatorCount: 3, deliverableCount: 8 },
];

export const teamMembers = [
  { id: "tm001", fullName: "Amira Al Qassimi", email: "amira@maqsaddemo.ae", role: "owner" as const, assignedCampaigns: 4, taskCount: 12, status: "active" as const, joinedAt: "2023-06-15T08:00:00Z" },
  { id: "tm002", fullName: "Lina Abboud", email: "lina@maqsaddemo.ae", role: "campaign_manager" as const, assignedCampaigns: 3, taskCount: 8, status: "active" as const, joinedAt: "2023-09-01T08:00:00Z" },
  { id: "tm003", fullName: "Khalid Hamza", email: "khalid@maqsaddemo.ae", role: "creator_manager" as const, assignedCampaigns: 2, taskCount: 15, status: "active" as const, joinedAt: "2023-11-15T08:00:00Z" },
  { id: "tm004", fullName: "Rania Al Saad", email: "rania@maqsaddemo.ae", role: "content_reviewer" as const, assignedCampaigns: 4, taskCount: 20, status: "active" as const, joinedAt: "2024-01-10T08:00:00Z" },
  { id: "tm005", fullName: "Jamal Al Khatib", email: "jamal@maqsaddemo.ae", role: "analyst" as const, assignedCampaigns: 3, taskCount: 6, status: "active" as const, joinedAt: "2024-02-20T08:00:00Z" },
  { id: "tm006", fullName: "Nadia Youssef", email: "nadia@maqsaddemo.ae", role: "campaign_manager" as const, assignedCampaigns: 2, taskCount: 9, status: "active" as const, joinedAt: "2024-03-01T08:00:00Z" },
  { id: "tm007", fullName: "Hassan Al Farsi", email: "hassan@maqsaddemo.ae", role: "creator_manager" as const, assignedCampaigns: 1, taskCount: 4, status: "active" as const, joinedAt: "2024-04-15T08:00:00Z" },
  { id: "tm008", fullName: "Manal Bilal", email: "manal@maqsaddemo.ae", role: "content_reviewer" as const, assignedCampaigns: 2, taskCount: 11, status: "active" as const, joinedAt: "2024-05-01T08:00:00Z" },
];
