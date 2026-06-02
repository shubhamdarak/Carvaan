"use client";

import {
  Users, Building2, Briefcase, Megaphone, TrendingUp,
  CreditCard, Clock, AlertCircle, Activity,
} from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { creators } from "@/data/creators";
import { campaigns } from "@/data/campaigns";
import { brands } from "@/data/brands";
import { agencies } from "@/data/agencies";
import { payments } from "@/data/payments";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar,
} from "recharts";

const monthlyData = [
  { month: "Nov", campaigns: 4, creators: 8, revenue: 28000 },
  { month: "Dec", campaigns: 6, creators: 12, revenue: 42000 },
  { month: "Jan", campaigns: 8, creators: 18, revenue: 58000 },
  { month: "Feb", campaigns: 7, creators: 14, revenue: 49000 },
  { month: "Mar", campaigns: 9, creators: 20, revenue: 67000 },
  { month: "Apr", campaigns: 11, creators: 24, revenue: 82000 },
  { month: "May", campaigns: 12, creators: 28, revenue: 91000 },
];

const recentActivity = [
  { time: "2 min ago", event: "New creator registered", detail: "Wafa Al Khalidi, Kuwait", type: "creator" },
  { time: "15 min ago", event: "Campaign launched", detail: "ProGear Protein Series went live", type: "campaign" },
  { time: "1 hr ago", event: "Content approved", detail: "Gleam Radiance, 3 deliverables approved", type: "content" },
  { time: "2 hr ago", event: "Payment processed", detail: "AED 17,000 to Noor Al Suwaidi", type: "payment" },
  { time: "3 hr ago", event: "New brand onboarded", detail: "NestHQ, Kuwait", type: "brand" },
  { time: "5 hr ago", event: "Agency created campaign", detail: "Maqsad Creative, Gleam Night Recovery", type: "campaign" },
];

const activityColor: Record<string, string> = {
  creator: "bg-teal-100 text-teal-700",
  campaign: "bg-[#d5e0f1] text-[#1e3d72]",
  content: "bg-sky-100 text-sky-700",
  payment: "bg-emerald-100 text-emerald-700",
  brand: "bg-purple-100 text-purple-700",
};

export default function AdminDashboard() {
  const pendingApprovals = creators.filter((c) => c.status === "pending").length;
  const pendingPayments = payments.filter((p) => p.status === "pending" || p.status === "approved").length;
  const activeCampaigns = campaigns.filter((c) => c.status === "live" || c.status === "tracking").length;
  const totalRevenue = payments.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.totalAmount, 0);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Creators" value={formatNumber(creators.length)} change={12} changeLabel="this month" icon={<Users className="w-5 h-5" />} accent="teal" />
        <StatCard title="Active Campaigns" value={activeCampaigns} change={8} changeLabel="vs last month" icon={<Megaphone className="w-5 h-5" />} accent="navy" />
        <StatCard title="Total Brands" value={brands.length} change={3} changeLabel="this month" icon={<Building2 className="w-5 h-5" />} accent="sky" />
        <StatCard title="Total Agencies" value={agencies.length} icon={<Briefcase className="w-5 h-5" />} accent="emerald" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Platform Revenue" value={formatCurrency(totalRevenue, "AED")} change={18} changeLabel="this month" icon={<CreditCard className="w-5 h-5" />} accent="emerald" />
        <StatCard title="Total Reach" value="4.2M" change={24} changeLabel="this month" icon={<TrendingUp className="w-5 h-5" />} accent="teal" />
        <StatCard title="Pending Approvals" value={pendingApprovals} icon={<Clock className="w-5 h-5" />} accent="amber" />
        <StatCard title="Pending Payments" value={pendingPayments} icon={<AlertCircle className="w-5 h-5" />} accent="amber" />
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Platform Revenue</CardTitle>
          </CardHeader>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#20a4b0" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#20a4b0" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}K`} />
              <Tooltip formatter={(v: unknown) => [`AED ${Number(v).toLocaleString()}`, "Revenue"]} contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
              <Area type="monotone" dataKey="revenue" stroke="#20a4b0" strokeWidth={2} fill="url(#revenueGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Campaigns and Creators</CardTitle>
          </CardHeader>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
              <Bar dataKey="campaigns" name="Campaigns" fill="#0f1e38" radius={[3, 3, 0, 0]} />
              <Bar dataKey="creators" name="Creators" fill="#20a4b0" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Campaign status breakdown */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Campaign Status</CardTitle>
          </CardHeader>
          <div className="space-y-2">
            {[
              { status: "live", count: campaigns.filter((c) => c.status === "live").length },
              { status: "tracking", count: campaigns.filter((c) => c.status === "tracking").length },
              { status: "outreach_started", count: campaigns.filter((c) => c.status === "outreach_started").length },
              { status: "shortlisted", count: campaigns.filter((c) => c.status === "shortlisted").length },
              { status: "brief_created", count: campaigns.filter((c) => c.status === "brief_created").length },
              { status: "draft", count: campaigns.filter((c) => c.status === "draft").length },
              { status: "completed", count: campaigns.filter((c) => c.status === "completed").length },
            ].map((s) => (
              <div key={s.status} className="flex items-center justify-between">
                <StatusBadge status={s.status} />
                <span className="text-sm font-semibold text-slate-700">{s.count}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent activity */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <div className="space-y-3">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className={`mt-0.5 text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${activityColor[a.type]}`}>{a.type}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800">{a.event}</p>
                  <p className="text-xs text-slate-500 truncate">{a.detail}</p>
                </div>
                <span className="text-xs text-slate-400 flex-shrink-0 mt-0.5">{a.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
