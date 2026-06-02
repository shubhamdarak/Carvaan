import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: unknown): string {
  const num = typeof n === "number" ? n : 0;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
}

export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return `${str.slice(0, length)}…`;
}

export function slugify(str: string): string {
  return str.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
}

export function calculateEngagementRate(
  followers: number,
  likes: number,
  comments: number,
  shares: number
): number {
  if (followers === 0) return 0;
  return ((likes + comments + shares) / followers) * 100;
}

export function calculateBrandFitScore(params: {
  nicheMatch: boolean;
  countryMatch: boolean;
  engagementRate: number;
  audienceGenderMatch: boolean;
  audienceAgeMatch: boolean;
}): number {
  let score = 0;
  if (params.nicheMatch) score += 30;
  if (params.countryMatch) score += 20;
  if (params.engagementRate >= 3) score += 20;
  else if (params.engagementRate >= 1.5) score += 10;
  if (params.audienceGenderMatch) score += 15;
  if (params.audienceAgeMatch) score += 15;
  return Math.min(score, 100);
}
