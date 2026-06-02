"use client";

import { Briefcase, FileText, CheckCircle, CreditCard, Clock, Globe } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { payments } from "@/data/payments";
import { contentSubmissions } from "@/data/content";
import { campaigns } from "@/data/campaigns";
import { creators } from "@/data/creators";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const creatorId = "c001";
const creator = creators.find((c) => c.id === creatorId)!;
const myPayments = payments.filter((p) => p.creatorId === creatorId);
const myContent = contentSubmissions.filter((c) => c.creatorId === creatorId);
const totalEarned = myPayments.filter((p) => p.status === "paid").reduce((s, p) => s + p.totalAmount, 0);
const pendingEarnings = myPayments.filter((p) => p.status !== "paid" && p.status !== "cancelled").reduce((s, p) => s + p.totalAmount, 0);

const earningsData = [
  { month: "Nov", amount: 0 },
  { month: "Dec", amount: 0 },
  { month: "Jan", amount: 9000 },
  { month: "Feb", amount: 8300 },
  { month: "Mar", amount: 0 },
  { month: "Apr", amount: 0 },
  { month: "May", amount: 9500 },
];

const opportunities = campaigns.filter((c) =>
  c.status === "scouting" || c.status === "brief_created"
).slice(0, 4);

export default function CreatorDashboard() {
  const activeCampaigns = myContent.filter((c) => c.status !== "approved" && c.status !== "rejected" && c.status !== "posted").length;
  const approvedContent = myContent.filter((c) => c.status === "approved" || c.status === "posted").length;

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 bg-gradient-to-br from-[#d5e0f1] to-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-[#1e3d72] font-bold text-lg">{creator.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2)}</span>
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900">{creator.fullName}</h1>
          <p className="text-sm text-slate-500">{creator.niche} Creator, {creator.city}, {creator.country}</p>
          <div className="flex gap-3 mt-2">
            <span className="text-xs text-slate-500">{formatNumber(creator.followerCount)} followers</span>
            <span className="text-xs text-slate-500">{creator.engagementRate}% engagement</span>
            <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full font-medium">Verified</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Active Collaborations" value={activeCampaigns} icon={<Briefcase className="w-5 h-5" />} accent="navy" />
        <StatCard title="Pending Submissions" value={myContent.filter((c) => c.status === "submitted" || c.status === "under_review" || c.status === "revision_requested").length} icon={<FileText className="w-5 h-5" />} accent="amber" />
        <StatCard title="Approved Content" value={approvedContent} icon={<CheckCircle className="w-5 h-5" />} accent="emerald" />
        <StatCard title="Total Earned" value={formatCurrency(totalEarned, "AED")} change={15} changeLabel="this month" icon={<CreditCard className="w-5 h-5" />} accent="teal" />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader><CardTitle>Monthly Earnings</CardTitle></CardHeader>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={(v) => v > 0 ? `${v / 1000}K` : "0"} />
              <Tooltip formatter={(v: unknown) => [formatCurrency(Number(v), "AED"), "Earned"]} contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
              <Bar dataKey="amount" fill="#20a4b0" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <CardHeader><CardTitle>Payment Status</CardTitle></CardHeader>
          <div className="space-y-3">
            {myPayments.map((p) => (
              <div key={p.id} className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-800 truncate">{p.campaignName}</p>
                  <p className="text-sm font-bold text-slate-900">{formatCurrency(p.totalAmount, "AED")}</p>
                </div>
                <StatusBadge status={p.status} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Opportunities */}
      <Card>
        <CardHeader><CardTitle>Campaign Opportunities</CardTitle></CardHeader>
        <div className="grid md:grid-cols-2 gap-3">
          {opportunities.map((c) => (
            <div key={c.id} className="p-4 rounded-xl border border-slate-200 hover:border-teal-200 hover:bg-teal-50/20 transition-all cursor-pointer">
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-sm font-semibold text-slate-900">{c.campaignName}</p>
                <StatusBadge status={c.status} />
              </div>
              <p className="text-xs text-slate-500 mb-2">{c.clientName}, {c.targetLocation}</p>
              <p className="text-xs text-slate-600">{c.objective}</p>
              <p className="text-xs text-teal-600 font-medium mt-2">Creator budget: {formatCurrency(c.creatorBudget, "AED")}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Content submissions */}
      <Card>
        <CardHeader><CardTitle>My Content Submissions</CardTitle></CardHeader>
        <div className="space-y-2">
          {myContent.map((c) => (
            <div key={c.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
              <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-slate-500">{c.contentType.toUpperCase().slice(0, 2)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-800 truncate">{c.campaignName}</p>
                <p className="text-xs text-slate-500 truncate">{c.caption}</p>
              </div>
              <StatusBadge status={c.status} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
