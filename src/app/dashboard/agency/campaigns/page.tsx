"use client";

import { useState } from "react";
import { Plus, Search, Filter, Calendar, DollarSign, Users } from "lucide-react";
import { campaigns } from "@/data/campaigns";
import type { CampaignStatus } from "@/types";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { PlatformBadges } from "@/components/ui/platform-icon";

const statusGroups: { label: string; statuses: CampaignStatus[] }[] = [
  { label: "All", statuses: [] },
  { label: "Active", statuses: ["outreach_started", "negotiation", "awaiting_approval", "awaiting_content", "content_submitted", "revision_requested", "content_approved", "scheduled", "live", "tracking"] },
  { label: "Planning", statuses: ["draft", "brief_created", "scouting", "shortlisted"] },
  { label: "Completed", statuses: ["completed", "cancelled"] },
];

export default function CampaignsPage() {
  const [search, setSearch] = useState("");
  const [statusGroup, setStatusGroup] = useState("All");
  const [showCreate, setShowCreate] = useState(false);

  const filtered = campaigns.filter((c) => {
    const q = search.toLowerCase();
    const matchSearch = !q || c.campaignName.toLowerCase().includes(q) || c.clientName.toLowerCase().includes(q);
    const group = statusGroups.find((g) => g.label === statusGroup);
    const matchStatus = !group || group.statuses.length === 0 || group.statuses.includes(c.status);
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Campaigns</h1>
          <p className="text-sm text-slate-500">{campaigns.length} campaigns total</p>
        </div>
        <Button variant="primary" size="md" onClick={() => setShowCreate(true)}>
          <Plus className="w-4 h-4" />
          New Campaign
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-lg p-1 w-fit">
        {statusGroups.map((g) => (
          <button
            key={g.label}
            onClick={() => setStatusGroup(g.label)}
            className={cn(
              "px-4 py-1.5 rounded-md text-sm font-medium transition-all",
              statusGroup === g.label ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
            )}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input type="text" placeholder="Search campaigns..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Campaign</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Client</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Platforms</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Budget</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Timeline</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Assigned To</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60 transition-colors cursor-pointer">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-semibold text-slate-900">{c.campaignName}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{c.objective}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-slate-700">{c.clientName}</p>
                      <p className="text-xs text-slate-500">{c.targetLocation}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <PlatformBadges platforms={c.platforms} />
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-slate-800">{formatCurrency(c.budget, "AED")}</p>
                    <p className="text-xs text-slate-500">Creator: {formatCurrency(c.creatorBudget, "AED")}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-xs text-slate-600">{formatDate(c.startDate)}</p>
                    <p className="text-xs text-slate-500">to {formatDate(c.endDate)}</p>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-xs text-slate-600">{c.assignedTeamMember}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-slate-500">
            <p className="text-sm">No campaigns match your filters</p>
          </div>
        )}
      </div>

      {/* Create campaign modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">New Campaign</h2>
              <button onClick={() => setShowCreate(false)} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-500">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl">
                <p className="text-sm font-semibold text-teal-800">Campaign creation coming soon</p>
                <p className="text-sm text-teal-700 mt-1">The full campaign creation form with brief builder, deliverables, KPI targets, and creator requirements is a premium feature available in the Growth plan and above.</p>
              </div>
              <Button variant="outline" size="md" className="w-full" onClick={() => setShowCreate(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
