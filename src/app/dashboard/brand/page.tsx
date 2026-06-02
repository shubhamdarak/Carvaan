"use client";

import { Megaphone, Users, CheckSquare, TrendingUp, MousePointer, BarChart2, CreditCard, Target } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { campaigns } from "@/data/campaigns";
import { contentSubmissions } from "@/data/content";
import { payments } from "@/data/payments";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Link from "next/link";

const gleamCampaigns = campaigns.filter((c) => c.brandName === "Gleam Skincare");

const reachData = [
  { month: "Jan", reach: 210000 },
  { month: "Feb", reach: 290000 },
  { month: "Mar", reach: 180000 },
  { month: "Apr", reach: 320000 },
  { month: "May", reach: 410000 },
];

export default function BrandDashboard() {
  const activeCampaigns = gleamCampaigns.filter((c) => c.status !== "completed" && c.status !== "cancelled" && c.status !== "draft");
  const pendingContent = contentSubmissions.filter((c) => ["c001", "c017", "c030"].includes(c.creatorId) && (c.status === "submitted" || c.status === "under_review"));
  const pendingPay = payments.filter((p) => p.campaignId.includes("camp00") && (p.status === "pending" || p.status === "approved"));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Active Campaigns" value={activeCampaigns.length} icon={<Megaphone className="w-5 h-5" />} accent="navy" />
        <StatCard title="Creators Selected" value={8} icon={<Users className="w-5 h-5" />} accent="teal" />
        <StatCard title="Content Pending Approval" value={pendingContent.length} icon={<CheckSquare className="w-5 h-5" />} accent="amber" />
        <StatCard title="Total Campaign Reach" value="1.4M" change={22} changeLabel="this month" icon={<TrendingUp className="w-5 h-5" />} accent="sky" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Engagement Rate" value="4.8%" change={5} changeLabel="vs benchmark" icon={<BarChart2 className="w-5 h-5" />} accent="teal" />
        <StatCard title="Total Clicks" value="18.2K" change={31} changeLabel="this month" icon={<MousePointer className="w-5 h-5" />} accent="navy" />
        <StatCard title="Coupon Redemptions" value={513} icon={<Target className="w-5 h-5" />} accent="emerald" />
        <StatCard title="Campaign Spend" value={formatCurrency(83000, "AED")} icon={<CreditCard className="w-5 h-5" />} accent="navy" />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader><CardTitle>Campaign Reach Trend</CardTitle></CardHeader>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={reachData}>
              <defs>
                <linearGradient id="brandReach" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#20a4b0" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#20a4b0" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}K`} />
              <Tooltip formatter={(v: unknown) => [formatNumber(v), "Reach"]} contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
              <Area type="monotone" dataKey="reach" stroke="#20a4b0" strokeWidth={2} fill="url(#brandReach)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <CardHeader><CardTitle>Campaign Progress</CardTitle></CardHeader>
          <div className="space-y-3">
            {gleamCampaigns.map((c) => (
              <div key={c.id} className="p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                <p className="text-xs font-semibold text-slate-800 mb-1 truncate">{c.campaignName}</p>
                <StatusBadge status={c.status} />
                <p className="text-xs text-slate-500 mt-1">Budget: {formatCurrency(c.budget, "AED")}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
