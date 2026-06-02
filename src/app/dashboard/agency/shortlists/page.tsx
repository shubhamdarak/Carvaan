"use client";

import { useState } from "react";
import { creators } from "@/data/creators";
import { campaigns } from "@/data/campaigns";
import { formatNumber, formatCurrency, formatPercent, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/input";
import { PlatformIcon } from "@/components/ui/platform-icon";
import { X, Star, TrendingUp, Globe } from "lucide-react";

const demoShortlist = creators.filter((c) =>
  ["c001", "c002", "c005", "c007", "c010", "c015", "c017", "c022"].includes(c.id)
).map((c) => ({ ...c, shortlistStatus: "under_review" as "under_review" | "approved" | "rejected" }));

export default function ShortlistsPage() {
  const [shortlist, setShortlist] = useState(demoShortlist);
  const [selectedCampaign, setSelectedCampaign] = useState("");

  const updateStatus = (id: string, status: "approved" | "rejected") => {
    setShortlist((prev) => prev.map((c) => c.id === id ? { ...c, shortlistStatus: status } : c));
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Creator Shortlists</h1>
          <p className="text-sm text-slate-500">{shortlist.length} creators shortlisted</p>
        </div>
        <div className="max-w-xs">
          <Select
            options={campaigns.map((c) => ({ value: c.id, label: c.campaignName }))}
            placeholder="Filter by campaign"
            value={selectedCampaign}
            onChange={(e) => setSelectedCampaign(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Creator</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Platform</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Niche</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Followers</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Engagement</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg Views</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Fit Score</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Rate/Reel</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {shortlist.map((c) => (
                <tr key={c.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 bg-[#d5e0f1] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-[#1e3d72] font-semibold text-xs">{c.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2)}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{c.fullName}</p>
                        <p className="text-xs text-slate-500">{c.instagramHandle || c.tiktokHandle}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><PlatformIcon platform={c.primaryPlatform} size="sm" /></td>
                  <td className="px-4 py-3"><span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{c.niche}</span></td>
                  <td className="px-4 py-3 text-slate-600 text-xs">{c.city}, {c.country}</td>
                  <td className="px-4 py-3 text-right font-medium text-slate-800">{formatNumber(c.followerCount)}</td>
                  <td className="px-4 py-3 text-right text-slate-600">{formatPercent(c.engagementRate)}</td>
                  <td className="px-4 py-3 text-right text-slate-600">{formatNumber(c.averageViews)}</td>
                  <td className="px-4 py-3 text-right">
                    <span className={cn("font-bold text-sm", c.brandFitScore >= 85 ? "text-emerald-600" : c.brandFitScore >= 70 ? "text-amber-600" : "text-slate-500")}>
                      {c.brandFitScore}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-slate-800">{formatCurrency(c.ratePerReel, "AED")}</td>
                  <td className="px-4 py-3">
                    <span className={cn("text-xs font-medium px-2.5 py-1 rounded-full", c.shortlistStatus === "approved" ? "bg-emerald-100 text-emerald-700" : c.shortlistStatus === "rejected" ? "bg-red-100 text-red-600" : "bg-slate-100 text-slate-600")}>
                      {c.shortlistStatus === "under_review" ? "Under Review" : c.shortlistStatus.charAt(0).toUpperCase() + c.shortlistStatus.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {c.shortlistStatus === "under_review" && (
                      <div className="flex gap-1.5">
                        <Button variant="outline" size="sm" onClick={() => updateStatus(c.id, "approved")} className="text-emerald-600 border-emerald-200 hover:bg-emerald-50">Approve</Button>
                        <Button variant="ghost" size="sm" onClick={() => updateStatus(c.id, "rejected")} className="text-red-500 hover:bg-red-50">
                          <X className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
