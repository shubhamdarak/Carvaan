"use client";

import { teamMembers } from "@/data/reports";
import { formatDate, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus, Mail } from "lucide-react";

const roleLabels: Record<string, string> = {
  owner: "Owner",
  campaign_manager: "Campaign Manager",
  creator_manager: "Creator Manager",
  content_reviewer: "Content Reviewer",
  analyst: "Analyst",
};

const roleColors: Record<string, string> = {
  owner: "bg-[#d5e0f1] text-[#1e3d72]",
  campaign_manager: "bg-teal-100 text-teal-700",
  creator_manager: "bg-sky-100 text-sky-700",
  content_reviewer: "bg-purple-100 text-purple-700",
  analyst: "bg-amber-100 text-amber-700",
};

export default function TeamPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Team</h1>
          <p className="text-sm text-slate-500">{teamMembers.length} team members</p>
        </div>
        <Button variant="primary" size="md">
          <Plus className="w-4 h-4" />
          Add Member
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-card-hover transition-shadow">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-11 h-11 bg-gradient-to-br from-[#d5e0f1] to-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[#1e3d72] font-bold text-sm">{member.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900">{member.fullName}</p>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <Mail className="w-3 h-3" />
                  {member.email}
                </p>
              </div>
              <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0", member.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500")}>
                {member.status}
              </span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className={cn("text-xs px-2.5 py-1 rounded-full font-medium", roleColors[member.role])}>
                {roleLabels[member.role]}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-slate-50 rounded-lg py-2">
                <p className="text-xs text-slate-500">Campaigns</p>
                <p className="text-sm font-bold text-slate-800">{member.assignedCampaigns}</p>
              </div>
              <div className="bg-slate-50 rounded-lg py-2">
                <p className="text-xs text-slate-500">Tasks</p>
                <p className="text-sm font-bold text-slate-800">{member.taskCount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
