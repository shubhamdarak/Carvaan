import { cn } from "@/lib/utils";
import type {
  CampaignStatus,
  OutreachStatus,
  ContentStatus,
  PaymentStatus,
  CreatorStatus,
  VerificationStatus,
} from "@/types";

type AnyStatus =
  | CampaignStatus
  | OutreachStatus
  | ContentStatus
  | PaymentStatus
  | CreatorStatus
  | VerificationStatus
  | string;

const statusConfig: Record<string, { label: string; className: string }> = {
  // Campaign
  draft: { label: "Draft", className: "bg-slate-100 text-slate-600" },
  brief_created: { label: "Brief Created", className: "bg-sky-100 text-sky-700" },
  scouting: { label: "Scouting Creators", className: "bg-blue-100 text-blue-700" },
  shortlisted: { label: "Shortlisted", className: "bg-indigo-100 text-indigo-700" },
  outreach_started: { label: "Outreach Started", className: "bg-purple-100 text-purple-700" },
  negotiation: { label: "In Negotiation", className: "bg-orange-100 text-orange-700" },
  awaiting_approval: { label: "Awaiting Approval", className: "bg-amber-100 text-amber-700" },
  awaiting_content: { label: "Awaiting Content", className: "bg-yellow-100 text-yellow-700" },
  content_submitted: { label: "Content Submitted", className: "bg-cyan-100 text-cyan-700" },
  revision_requested: { label: "Revision Requested", className: "bg-orange-100 text-orange-700" },
  content_approved: { label: "Content Approved", className: "bg-teal-100 text-teal-700" },
  scheduled: { label: "Scheduled", className: "bg-blue-100 text-blue-700" },
  live: { label: "Live", className: "bg-emerald-100 text-emerald-700 font-semibold" },
  tracking: { label: "Performance Tracking", className: "bg-violet-100 text-violet-700" },
  completed: { label: "Completed", className: "bg-slate-100 text-slate-700" },
  cancelled: { label: "Cancelled", className: "bg-red-100 text-red-600" },
  // Outreach
  not_contacted: { label: "Not Contacted", className: "bg-slate-100 text-slate-600" },
  contacted: { label: "Contacted", className: "bg-sky-100 text-sky-700" },
  follow_up: { label: "Follow-Up", className: "bg-amber-100 text-amber-700" },
  replied: { label: "Replied", className: "bg-blue-100 text-blue-700" },
  interested: { label: "Interested", className: "bg-teal-100 text-teal-700" },
  negotiating: { label: "Negotiating", className: "bg-orange-100 text-orange-700" },
  accepted: { label: "Accepted", className: "bg-emerald-100 text-emerald-700" },
  rejected: { label: "Rejected", className: "bg-red-100 text-red-600" },
  no_response: { label: "No Response", className: "bg-slate-100 text-slate-500" },
  confirmed: { label: "Confirmed", className: "bg-emerald-100 text-emerald-800 font-medium" },
  // Content
  submitted: { label: "Submitted", className: "bg-sky-100 text-sky-700" },
  under_review: { label: "Under Review", className: "bg-amber-100 text-amber-700" },
  approved: { label: "Approved", className: "bg-emerald-100 text-emerald-700" },
  posted: { label: "Posted", className: "bg-violet-100 text-violet-700" },
  // Payment
  pending: { label: "Pending", className: "bg-slate-100 text-slate-600" },
  processing: { label: "Processing", className: "bg-sky-100 text-sky-700" },
  paid: { label: "Paid", className: "bg-emerald-100 text-emerald-700" },
  on_hold: { label: "On Hold", className: "bg-amber-100 text-amber-700" },
  disputed: { label: "Disputed", className: "bg-red-100 text-red-600" },
  // Creator
  "approved-creator": { label: "Approved", className: "bg-emerald-100 text-emerald-700" },
  suspended: { label: "Suspended", className: "bg-red-100 text-red-600" },
  // Verification
  verified: { label: "Verified", className: "bg-teal-100 text-teal-700" },
  not_verified: { label: "Not Verified", className: "bg-slate-100 text-slate-500" },
  under_review_v: { label: "Under Review", className: "bg-amber-100 text-amber-700" },
};

interface StatusBadgeProps {
  status: AnyStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || {
    label: status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    className: "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
