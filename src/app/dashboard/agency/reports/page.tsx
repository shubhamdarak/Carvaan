"use client";

import { reports } from "@/data/reports";
import { formatDate, formatNumber, formatCurrency, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Download, Share2, Eye } from "lucide-react";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function ReportPreviewModal({ report, onClose }: { report: typeof reports[0]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">{report.campaignName}</h2>
            <p className="text-xs text-slate-500">Campaign Report, {report.clientName}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-500">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-6 space-y-6">
          {/* Summary */}
          <div>
            <h3 className="text-sm font-bold text-slate-800 mb-3">Campaign Summary</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Total Reach", value: formatNumber(report.totalReach) },
                { label: "Total Views", value: formatNumber(report.totalViews) },
                { label: "Total Engagement", value: formatNumber(report.totalEngagement) },
                { label: "Total Clicks", value: formatNumber(report.totalClicks) },
                { label: "Conversions", value: formatNumber(report.totalConversions) },
                { label: "Campaign ROI", value: report.roi > 0 ? `${report.roi}%` : "Tracking" },
                { label: "Creators Involved", value: report.creatorCount },
                { label: "Deliverables Completed", value: report.deliverableCount },
              ].map((s) => (
                <div key={s.label} className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-500">{s.label}</p>
                  <p className="text-base font-bold text-slate-900 mt-0.5">{s.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div>
            <h3 className="text-sm font-bold text-slate-800 mb-3">Performance Overview</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={[
                { metric: "Reach", value: report.totalReach },
                { metric: "Views", value: report.totalViews },
                { metric: "Engagement", value: report.totalEngagement },
                { metric: "Clicks", value: report.totalClicks },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="metric" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v}`} />
                <Tooltip formatter={(v: unknown) => [formatNumber(v)]} contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
                <Bar dataKey="value" fill="#20a4b0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recommendations */}
          <div className="bg-[#eef2f9] rounded-xl p-5">
            <h3 className="text-sm font-bold text-[#0f1e38] mb-3">Learnings and Recommendations</h3>
            <ul className="space-y-2 text-sm text-[#182f58]">
              <li> Reel content consistently outperformed static posts by 2.3x reach</li>
              <li> Evening posts (7–9 PM GST) drove 35% higher engagement rates</li>
              <li> Creators with over 3.5% engagement rate delivered best cost-per-click results</li>
              <li> UAE-audience creators showed higher click-to-lead conversion than KSA in this campaign</li>
            </ul>
            <h3 className="text-sm font-bold text-[#0f1e38] mt-4 mb-2">Next Campaign Suggestions</h3>
            <ul className="space-y-1.5 text-sm text-[#182f58]">
              <li> Increase creator count from 3 to 5 for broader reach coverage</li>
              <li> Add TikTok to platform mix to capture younger 18–24 demographic</li>
              <li> Test UGC hook-style content in first 3 seconds of video</li>
            </ul>
          </div>

          <div className="flex gap-3 pt-2 border-t border-slate-100">
            <Button variant="outline" size="md" className="flex-1">
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
            <Button variant="outline" size="md" className="flex-1">
              <Share2 className="w-4 h-4" />
              Share Report
            </Button>
            <Button variant="primary" size="md" onClick={onClose} className="flex-1">Close</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReportsPage() {
  const [selected, setSelected] = useState<typeof reports[0] | null>(null);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Reports</h1>
        <p className="text-sm text-slate-500">{reports.length} campaign reports</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reports.map((r) => (
          <Card key={r.id} className="hover:shadow-card-hover transition-shadow">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-[#eef2f9] rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-[#1e3d72]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 text-sm truncate">{r.campaignName}</p>
                <p className="text-xs text-slate-500">{r.clientName}</p>
              </div>
              <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0", r.status === "shared" ? "bg-emerald-100 text-emerald-700" : r.status === "ready" ? "bg-sky-100 text-sky-700" : "bg-slate-100 text-slate-600")}>
                {r.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-slate-50 rounded-lg p-2.5 text-center">
                <p className="text-xs text-slate-500">Reach</p>
                <p className="text-sm font-bold text-slate-900">{formatNumber(r.totalReach)}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-2.5 text-center">
                <p className="text-xs text-slate-500">Engagement</p>
                <p className="text-sm font-bold text-slate-900">{formatNumber(r.totalEngagement)}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-2.5 text-center">
                <p className="text-xs text-slate-500">Clicks</p>
                <p className="text-sm font-bold text-slate-900">{formatNumber(r.totalClicks)}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-2.5 text-center">
                <p className="text-xs text-slate-500">ROI</p>
                <p className={cn("text-sm font-bold", r.roi > 0 ? "text-emerald-600" : "text-slate-500")}>{r.roi > 0 ? `${r.roi}%` : "Tracking"}</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 mb-3">Generated {formatDate(r.generatedAt)}</p>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => setSelected(r)}>
                <Eye className="w-3.5 h-3.5" />
                Preview
              </Button>
              <Button variant="ghost" size="sm">
                <Download className="w-3.5 h-3.5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {selected && <ReportPreviewModal report={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
