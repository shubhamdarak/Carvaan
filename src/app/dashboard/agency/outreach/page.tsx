"use client";

import { useState } from "react";
import { outreachRecords } from "@/data/outreach";
import type { OutreachRecord, OutreachStatus } from "@/types";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { MessageSquare, Phone, Mail, AtSign, Calendar, ChevronRight } from "lucide-react";

const stages: { status: OutreachStatus; label: string }[] = [
  { status: "not_contacted", label: "Not Contacted" },
  { status: "contacted", label: "Contacted" },
  { status: "follow_up", label: "Follow-Up" },
  { status: "replied", label: "Replied" },
  { status: "interested", label: "Interested" },
  { status: "negotiating", label: "Negotiating" },
  { status: "confirmed", label: "Confirmed" },
];

const stageColors: Record<string, string> = {
  not_contacted: "border-t-slate-400",
  contacted: "border-t-sky-400",
  follow_up: "border-t-amber-400",
  replied: "border-t-blue-400",
  interested: "border-t-teal-400",
  negotiating: "border-t-orange-400",
  confirmed: "border-t-emerald-400",
};

const channelIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  whatsapp: MessageSquare,
  email: Mail,
  instagram: AtSign,
  phone: Phone,
};

function OutreachCard({ record }: { record: OutreachRecord }) {
  const ChannelIcon = channelIcon[record.contactChannel] || MessageSquare;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-3.5 hover:shadow-card-hover hover:border-slate-300 transition-all cursor-pointer">
      <div className="flex items-start gap-2.5 mb-2.5">
        <div className="w-8 h-8 bg-[#d5e0f1] rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-[#1e3d72] font-semibold text-xs">{record.creatorName[0]}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-slate-900 truncate">{record.creatorName}</p>
          <p className="text-xs text-slate-500 truncate">{record.campaignName}</p>
        </div>
        <ChannelIcon className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
      </div>
      <p className="text-xs text-slate-500 line-clamp-2 mb-2.5">{record.lastMessagePreview}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400">{formatDate(record.lastContactedDate)}</span>
        <span className="text-xs font-semibold text-slate-700">{formatCurrency(record.rateProposed, "AED")}</span>
      </div>
      {record.rateAgreed && (
        <div className="mt-1.5 text-xs text-emerald-600 font-medium">
          Agreed: {formatCurrency(record.rateAgreed, "AED")}
        </div>
      )}
      {record.nextFollowUpDate && (
        <div className="mt-1.5 flex items-center gap-1 text-xs text-amber-600">
          <Calendar className="w-3 h-3" />
          Follow up: {formatDate(record.nextFollowUpDate)}
        </div>
      )}
    </div>
  );
}

export default function OutreachPipeline() {
  const [records, setRecords] = useState(outreachRecords.filter((o) => o.status !== "rejected" && o.status !== "no_response"));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Outreach Pipeline</h1>
          <p className="text-sm text-slate-500">{records.length} active creator relationships</p>
        </div>
      </div>

      {/* Kanban */}
      <div className="overflow-x-auto -mx-4 sm:-mx-6 px-4 sm:px-6">
        <div className="flex gap-4 min-w-max pb-4">
          {stages.map((stage) => {
            const stageRecords = records.filter((r) => r.status === stage.status);
            return (
              <div key={stage.status} className="w-64 flex-shrink-0">
                <div className={cn("rounded-t-xl border-t-4 bg-slate-50 border-l border-r border-slate-200", stageColors[stage.status])}>
                  <div className="px-3 py-2.5 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">{stage.label}</span>
                    <span className="text-xs bg-white border border-slate-200 text-slate-600 px-1.5 py-0.5 rounded-full font-medium">{stageRecords.length}</span>
                  </div>
                </div>
                <div className="border border-t-0 border-slate-200 rounded-b-xl bg-slate-50/50 p-2 space-y-2 min-h-24">
                  {stageRecords.map((record) => (
                    <OutreachCard key={record.id} record={record} />
                  ))}
                  {stageRecords.length === 0 && (
                    <div className="py-4 text-center text-xs text-slate-400">No creators</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
