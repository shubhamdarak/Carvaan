"use client";

import { performanceMetrics } from "@/data/performance";
import { campaigns } from "@/data/campaigns";
import { formatNumber, formatCurrency, formatPercent } from "@/lib/utils";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Eye, MousePointer, Target, BarChart2, Users } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const totalReach = performanceMetrics.reduce((s, m) => s + m.reach, 0);
const totalViews = performanceMetrics.reduce((s, m) => s + m.views, 0);
const totalEngagement = performanceMetrics.reduce((s, m) => s + m.likes + m.comments + m.shares, 0);
const totalClicks = performanceMetrics.reduce((s, m) => s + m.clicks, 0);
const totalConversions = performanceMetrics.reduce((s, m) => s + m.leads, 0);
const avgROI = performanceMetrics.filter((m) => m.roi > 0).reduce((s, m) => s + m.roi, 0) / performanceMetrics.filter((m) => m.roi > 0).length;

const weeklyReach = [
  { week: "W1 Jan", reach: 210000, engagement: 14800 },
  { week: "W2 Jan", reach: 340000, engagement: 22100 },
  { week: "W3 Jan", reach: 280000, engagement: 19200 },
  { week: "W4 Jan", reach: 420000, engagement: 28500 },
  { week: "W1 Feb", reach: 380000, engagement: 25900 },
  { week: "W2 Feb", reach: 510000, engagement: 34200 },
  { week: "W3 Feb", reach: 465000, engagement: 31800 },
  { week: "W4 Feb", reach: 590000, engagement: 39600 },
  { week: "W1 Mar", reach: 480000, engagement: 32400 },
  { week: "W2 Mar", reach: 620000, engagement: 41800 },
  { week: "W3 Mar", reach: 580000, engagement: 39100 },
  { week: "W4 Mar", reach: 710000, engagement: 47900 },
];

const platformPerf = [
  { platform: "Instagram", reach: 1850000, engagement: 128500, clicks: 42000 },
  { platform: "TikTok", reach: 980000, engagement: 76200, clicks: 28000 },
  { platform: "YouTube", reach: 540000, engagement: 31400, clicks: 18000 },
  { platform: "Snapchat", reach: 320000, engagement: 8400, clicks: 5200 },
];

const creatorROI = performanceMetrics
  .filter((m) => m.roi > 0)
  .sort((a, b) => b.roi - a.roi)
  .slice(0, 6)
  .map((m) => ({ name: m.creatorName.split(" ")[0], roi: m.roi, cost: m.cost }));

const COLORS = ["#0f1e38", "#20a4b0", "#0ea5e9", "#64748b", "#94a3b8"];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Analytics</h1>
        <p className="text-sm text-slate-500">All-time performance across {campaigns.length} campaigns</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard title="Total Reach" value={formatNumber(totalReach)} accent="navy" icon={<Eye className="w-5 h-5" />} />
        <StatCard title="Total Views" value={formatNumber(totalViews)} accent="teal" icon={<Eye className="w-5 h-5" />} />
        <StatCard title="Engagements" value={formatNumber(totalEngagement)} accent="sky" icon={<TrendingUp className="w-5 h-5" />} />
        <StatCard title="Total Clicks" value={formatNumber(totalClicks)} accent="navy" icon={<MousePointer className="w-5 h-5" />} />
        <StatCard title="Conversions" value={formatNumber(totalConversions)} accent="emerald" icon={<Target className="w-5 h-5" />} />
        <StatCard title="Avg ROI" value={`${Math.round(avgROI)}%`} accent="teal" icon={<BarChart2 className="w-5 h-5" />} />
      </div>

      {/* Charts row 1 */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Reach and Engagement Trend</CardTitle>
          </CardHeader>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={weeklyReach}>
              <defs>
                <linearGradient id="reachGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0f1e38" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#0f1e38" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="engGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#20a4b0" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#20a4b0" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}K`} />
              <Tooltip formatter={(v: unknown) => [formatNumber(v)]} contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
              <Area type="monotone" dataKey="reach" name="Reach" stroke="#0f1e38" strokeWidth={2} fill="url(#reachGrad2)" />
              <Area type="monotone" dataKey="engagement" name="Engagement" stroke="#20a4b0" strokeWidth={2} fill="url(#engGrad2)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Breakdown</CardTitle>
          </CardHeader>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={platformPerf} dataKey="reach" cx="50%" cy="50%" outerRadius={80} label={(props) => `${(props as unknown as {platform: string}).platform ?? ""} ${((props.percent ?? 0) * 100).toFixed(0)}%`} labelLine={false} fontSize={10}>
                {platformPerf.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v: unknown) => [formatNumber(v), "Reach"]} contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Charts row 2 */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Platform Performance</CardTitle>
          </CardHeader>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={platformPerf} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="platform" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}K`} />
              <Tooltip formatter={(v: unknown) => [formatNumber(v)]} contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
              <Bar dataKey="reach" name="Reach" fill="#0f1e38" radius={[3, 3, 0, 0]} />
              <Bar dataKey="engagement" name="Engagement" fill="#20a4b0" radius={[3, 3, 0, 0]} />
              <Bar dataKey="clicks" name="Clicks" fill="#0ea5e9" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ROI by Creator</CardTitle>
          </CardHeader>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={creatorROI} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} width={60} />
              <Tooltip formatter={(v: unknown) => [`${v}%`, "ROI"]} contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
              <Bar dataKey="roi" name="ROI %" fill="#20a4b0" radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Top performers table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Creator Performance</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Creator</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Campaign</th>
                <th className="text-right py-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Reach</th>
                <th className="text-right py-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Engagement</th>
                <th className="text-right py-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Clicks</th>
                <th className="text-right py-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">ROI</th>
              </tr>
            </thead>
            <tbody>
              {performanceMetrics.sort((a, b) => b.reach - a.reach).slice(0, 8).map((m) => (
                <tr key={m.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-slate-800">{m.creatorName}</td>
                  <td className="py-2.5 px-3 text-slate-500 max-w-[180px] truncate">{m.campaignName}</td>
                  <td className="py-2.5 px-3 text-right font-medium">{formatNumber(m.reach)}</td>
                  <td className="py-2.5 px-3 text-right text-slate-600">{formatPercent(m.engagementRate)}</td>
                  <td className="py-2.5 px-3 text-right text-slate-600">{formatNumber(m.clicks)}</td>
                  <td className="py-2.5 px-3 text-right">
                    {m.roi > 0 ? (
                      <span className="text-emerald-600 font-semibold">{m.roi}%</span>
                    ) : (
                      <span className="text-slate-400"></span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
