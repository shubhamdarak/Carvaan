"use client";

import { useState } from "react";
import { payments } from "@/data/payments";
import type { PaymentStatus } from "@/types";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { StatCard } from "@/components/ui/stat-card";
import { CreditCard, CheckCircle } from "lucide-react";

export default function PaymentsPage() {
  const [paymentList, setPaymentList] = useState(payments);
  const [filter, setFilter] = useState("all");

  const pending = paymentList.filter((p) => p.status === "pending");
  const approved = paymentList.filter((p) => p.status === "approved");
  const paid = paymentList.filter((p) => p.status === "paid");

  const pendingTotal = pending.reduce((s, p) => s + p.totalAmount, 0);
  const approvedTotal = approved.reduce((s, p) => s + p.totalAmount, 0);
  const paidTotal = paid.reduce((s, p) => s + p.totalAmount, 0);

  const filtered = paymentList.filter((p) => {
    if (filter === "all") return true;
    return p.status === filter;
  });

  const approvePayment = (id: string) => {
    setPaymentList((prev) => prev.map((p) => p.id === id ? { ...p, status: "approved" as PaymentStatus } : p));
  };

  const markPaid = (id: string) => {
    setPaymentList((prev) => prev.map((p) => p.id === id ? { ...p, status: "paid" as PaymentStatus, invoiceStatus: "paid" } : p));
  };

  const statusFilters = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "processing", label: "Processing" },
    { value: "paid", label: "Paid" },
    { value: "on_hold", label: "On Hold" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Creator Payments</h1>
        <p className="text-sm text-slate-500">{paymentList.length} payment records</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard title="Pending Payments" value={formatCurrency(pendingTotal, "AED")} icon={<CreditCard className="w-5 h-5" />} accent="amber" />
        <StatCard title="Approved (Awaiting Transfer)" value={formatCurrency(approvedTotal, "AED")} icon={<CreditCard className="w-5 h-5" />} accent="sky" />
        <StatCard title="Total Paid" value={formatCurrency(paidTotal, "AED")} icon={<CheckCircle className="w-5 h-5" />} accent="emerald" />
      </div>

      {/* Filters */}
      <div className="flex gap-1 flex-wrap">
        {statusFilters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={cn(
              "px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all",
              filter === f.value ? "bg-[#0f1e38] text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Creator</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Campaign</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Deliverable</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Agreed</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Bonus</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Total</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Due Date</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Invoice</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-800">{p.creatorName}</td>
                  <td className="px-4 py-3 text-slate-600 max-w-[160px] truncate">{p.campaignName}</td>
                  <td className="px-4 py-3 text-slate-600 max-w-[160px] truncate text-xs">{p.deliverable}</td>
                  <td className="px-4 py-3 text-right text-slate-700">{formatCurrency(p.agreedAmount, "AED")}</td>
                  <td className="px-4 py-3 text-right text-emerald-600">{p.bonusAmount > 0 ? `+${formatCurrency(p.bonusAmount, "AED")}` : ""}</td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-900">{formatCurrency(p.totalAmount, "AED")}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{formatDate(p.paymentDueDate)}</td>
                  <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                  <td className="px-4 py-3">
                    <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium",
                      p.invoiceStatus === "paid" ? "bg-emerald-100 text-emerald-700" :
                      p.invoiceStatus === "approved" ? "bg-sky-100 text-sky-700" :
                      p.invoiceStatus === "sent" ? "bg-blue-100 text-blue-700" :
                      "bg-slate-100 text-slate-600"
                    )}>
                      {p.invoiceStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      {p.status === "pending" && (
                        <Button variant="outline" size="sm" onClick={() => approvePayment(p.id)}>Approve</Button>
                      )}
                      {p.status === "approved" && (
                        <Button variant="secondary" size="sm" onClick={() => markPaid(p.id)}>Mark Paid</Button>
                      )}
                    </div>
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
