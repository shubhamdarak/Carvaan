"use client";

import { useState } from "react";
import { contentSubmissions } from "@/data/content";
import type { ContentStatus } from "@/types";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { formatDate, cn } from "@/lib/utils";
import { CheckCircle, XCircle, RotateCcw, ExternalLink, X } from "lucide-react";

const statusTabs: { label: string; status?: ContentStatus }[] = [
  { label: "All" },
  { label: "Submitted", status: "submitted" },
  { label: "Under Review", status: "under_review" },
  { label: "Revision Requested", status: "revision_requested" },
  { label: "Approved", status: "approved" },
  { label: "Posted", status: "posted" },
];

export default function ContentApprovalPage() {
  const [submissions, setSubmissions] = useState(contentSubmissions);
  const [activeTab, setActiveTab] = useState("All");
  const [selectedItem, setSelectedItem] = useState<typeof contentSubmissions[0] | null>(null);
  const [revisionNote, setRevisionNote] = useState("");

  const filtered = submissions.filter((s) => {
    if (activeTab === "All") return true;
    const tab = statusTabs.find((t) => t.label === activeTab);
    return tab?.status ? s.status === tab.status : true;
  });

  const updateStatus = (id: string, status: ContentStatus, note?: string) => {
    setSubmissions((prev) => prev.map((s) => s.id === id ? { ...s, status, reviewComments: note || s.reviewComments } : s));
    setSelectedItem(null);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Content Approval</h1>
        <p className="text-sm text-slate-500">{submissions.filter((s) => s.status === "submitted" || s.status === "under_review").length} items pending review</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 flex-wrap">
        {statusTabs.map((tab) => {
          const count = tab.status ? submissions.filter((s) => s.status === tab.status).length : submissions.length;
          return (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={cn(
                "px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5",
                activeTab === tab.label ? "bg-[#0f1e38] text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              )}
            >
              {tab.label}
              <span className={cn("text-xs px-1.5 py-0.5 rounded-full", activeTab === tab.label ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600")}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Content table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Creator</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Campaign</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Caption Preview</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Submitted</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 bg-[#d5e0f1] rounded-full flex items-center justify-center">
                        <span className="text-[#1e3d72] font-semibold text-xs">{item.creatorName[0]}</span>
                      </div>
                      <span className="font-medium text-slate-800">{item.creatorName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600 max-w-[160px] truncate">{item.campaignName}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium uppercase">{item.contentType}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-600 max-w-[200px]">
                    <p className="text-xs truncate">{item.caption}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{formatDate(item.submittedDate)}</td>
                  <td className="px-4 py-3"><StatusBadge status={item.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <Button variant="ghost" size="sm" onClick={() => setSelectedItem(item)}>
                        <ExternalLink className="w-3.5 h-3.5" />
                        View
                      </Button>
                      {(item.status === "submitted" || item.status === "under_review") && (
                        <>
                          <button onClick={() => updateStatus(item.id, "approved")} className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors" title="Approve">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button onClick={() => { setSelectedItem(item); }} className="p-1.5 rounded-lg text-amber-600 hover:bg-amber-50 transition-colors" title="Request Revision">
                            <RotateCcw className="w-4 h-4" />
                          </button>
                          <button onClick={() => updateStatus(item.id, "rejected")} className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors" title="Reject">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">Content Review</h2>
              <button onClick={() => { setSelectedItem(null); setRevisionNote(""); }} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-slate-500">Creator:</span> <span className="font-medium">{selectedItem.creatorName}</span></div>
                <div><span className="text-slate-500">Campaign:</span> <span className="font-medium">{selectedItem.campaignName}</span></div>
                <div><span className="text-slate-500">Type:</span> <span className="font-medium uppercase">{selectedItem.contentType}</span></div>
                <div><span className="text-slate-500">Submitted:</span> <span className="font-medium">{formatDate(selectedItem.submittedDate)}</span></div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-slate-600 mb-1">Caption</p>
                <p className="text-sm text-slate-700">{selectedItem.caption}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-slate-600 mb-1">Post Concept</p>
                <p className="text-sm text-slate-700">{selectedItem.postConcept}</p>
              </div>
              {selectedItem.reviewComments && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <p className="text-xs font-semibold text-amber-700 mb-1">Previous Review Note</p>
                  <p className="text-sm text-amber-800">{selectedItem.reviewComments}</p>
                </div>
              )}
              {(selectedItem.status === "submitted" || selectedItem.status === "under_review") && (
                <textarea
                  placeholder="Add revision note (required for revision request)..."
                  value={revisionNote}
                  onChange={(e) => setRevisionNote(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none min-h-[80px]"
                />
              )}
              <div className="flex gap-3 pt-2">
                {(selectedItem.status === "submitted" || selectedItem.status === "under_review") && (
                  <>
                    <Button variant="outline" size="md" onClick={() => updateStatus(selectedItem.id, "revision_requested", revisionNote)} className="flex-1">
                      <RotateCcw className="w-4 h-4" />
                      Request Revision
                    </Button>
                    <Button variant="primary" size="md" onClick={() => updateStatus(selectedItem.id, "approved")} className="flex-1">
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </Button>
                  </>
                )}
                {(selectedItem.status === "approved" || selectedItem.status === "revision_requested" || selectedItem.status === "rejected") && (
                  <Button variant="outline" size="md" onClick={() => { setSelectedItem(null); setRevisionNote(""); }} className="w-full">Close</Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
