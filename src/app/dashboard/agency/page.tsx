"use client";

import {
  Building2, Megaphone, Star, CheckSquare,
  TrendingUp, Users, CreditCard, BarChart2,
} from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency, formatNumber, formatDate } from "@/lib/utils";
import { campaigns } from "@/data/campaigns";
import { payments } from "@/data/payments";
import { contentSubmissions } from "@/data/content";
import { brands } from "@/data/brands";
import { outreachRecords } from "@/data/outreach";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import Link from "next/link";

const performanceData = [
  { week: "W1", reach: 185000, engagement: 12400 },
  { week: "W2", reach: 240000, engagement: 16800 },
  { week: "W3", reach: 310000, engagement: 21200 },
  { week: "W4", reach: 280000, engagement: 18900 },
  { week: "W5", reach: 420000, engagement: 28600 },
  { week: "W6", reach: 380000, engagement: 25400 },
  { week: "W7", reach: 510000, engagement: 34200 },
  { week: "W8", reach: 495000, engagement: 32800 },
];

export default function AgencyDashboard() {
  const activeCampaigns = campaigns.filter((c) => c.status !== "draft" && c.status !== "completed" && c.status !== "cancelled");
  const pendingContent = contentSubmissions.filter((c) => c.status === "submitted" || c.status === "under_review");
  const confirmedCreators = outreachRecords.filter((o) => o.status === "confirmed").length;
  const pendingPaymentTotal = payments.filter((p) => p.status === "pending" || p.status === "approved").reduce((s, p) => s + p.totalAmount, 0);
  const paidTotal = payments.filter((p) => p.status === "paid").reduce((s, p) => s + p.totalAmount, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Active Clients" value={brands.length} icon={<Building2 className="w-5 h-5" />} accent="navy" />
        <StatCard title="Active Campaigns" value={activeCampaigns.length} change={2} changeLabel="new this week" icon={<Megaphone className="w-5 h-5" />} accent="teal" />
        <StatCard title="Confirmed Creators" value={confirmedCreators} icon={<Star className="w-5 h-5" />} accent="sky" />
        <StatCard title="Content Pending Review" value={pendingContent.length} icon={<CheckSquare className="w-5 h-5" />} accent="amber" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Reach (MTD)" value="2.4M" change={18} changeLabel="vs last month" icon={<TrendingUp className="w-5 h-5" />} accent="teal" />
        <StatCard title="Total Engagement" value="142K" change={24} changeLabel="vs last month" icon={<BarChart2 className="w-5 h-5" />} accent="navy" />
        <StatCard title="Campaign Spend" value={formatCurrency(paidTotal, "AED")} icon={<CreditCard className="w-5 h-5" />} accent="emerald" />
        <StatCard title="Pending Payments" value={formatCurrency(pendingPaymentTotal, "AED")} icon={<CreditCard className="w-5 h-5" />} accent="amber" />
      </div>

      {/* Performance chart */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Reach and Engagement</CardTitle>
          </CardHeader>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="reachGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0f1e38" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#0f1e38" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="engGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#20a4b0" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#20a4b0" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}K`} />
              <Tooltip formatter={(v: unknown) => [formatNumber(v)]} contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
              <Area type="monotone" dataKey="reach" name="Reach" stroke="#0f1e38" strokeWidth={2} fill="url(#reachGrad)" />
              <Area type="monotone" dataKey="engagement" name="Engagement" stroke="#20a4b0" strokeWidth={2} fill="url(#engGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Campaign status */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Pipeline</CardTitle>
          </CardHeader>
          <div className="space-y-2.5">
            {activeCampaigns.slice(0, 6).map((c) => (
              <Link key={c.id} href={`/dashboard/agency/campaigns`} className="block">
                <div className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-800 truncate">{c.campaignName}</p>
                    <p className="text-xs text-slate-500 truncate">{c.clientName}</p>
                  </div>
                  <StatusBadge status={c.status} />
                </div>
              </Link>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent content + outreach */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Content Pending Review</CardTitle>
          </CardHeader>
          <div className="space-y-2">
            {pendingContent.slice(0, 5).map((c) => (
              <div key={c.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-slate-500">{c.contentType.toUpperCase().slice(0, 2)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-800 truncate">{c.creatorName}</p>
                  <p className="text-xs text-slate-500 truncate">{c.campaignName}</p>
                </div>
                <StatusBadge status={c.status} />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Outreach Activity</CardTitle>
          </CardHeader>
          <div className="space-y-2">
            {outreachRecords.filter((o) => o.status !== "confirmed" && o.status !== "rejected").slice(0, 5).map((o) => (
              <div key={o.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-slate-500">{o.creatorName[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-800 truncate">{o.creatorName}</p>
                  <p className="text-xs text-slate-500 truncate">{o.campaignName}</p>
                </div>
                <StatusBadge status={o.status} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
