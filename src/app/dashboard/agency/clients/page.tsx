"use client";

import { brands } from "@/data/brands";
import { campaigns } from "@/data/campaigns";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Megaphone, Plus } from "lucide-react";

export default function ClientsPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Clients</h1>
          <p className="text-sm text-slate-500">{brands.length} brand clients</p>
        </div>
        <Button variant="primary" size="md">
          <Plus className="w-4 h-4" />
          Add Client
        </Button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {brands.map((brand) => {
          const brandCampaigns = campaigns.filter((c) => c.brandName === brand.name);
          const active = brandCampaigns.filter((c) => c.status !== "completed" && c.status !== "cancelled" && c.status !== "draft").length;
          return (
            <Card key={brand.id}>
              <div className="flex items-start gap-3 mb-4">
                <div className="w-11 h-11 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-slate-700 font-bold text-base">{brand.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900">{brand.name}</p>
                  <p className="text-xs text-slate-500">{brand.industry}</p>
                  <p className="text-xs text-slate-400">{brand.country}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-slate-50 rounded-lg p-2.5 text-center">
                  <p className="text-xs text-slate-500">Active Campaigns</p>
                  <p className="text-base font-bold text-slate-900">{active}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-2.5 text-center">
                  <p className="text-xs text-slate-500">Total Spend</p>
                  <p className="text-sm font-bold text-slate-900">{formatCurrency(brand.totalSpend, "AED")}</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 mb-4">{brand.description}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">View Campaigns</Button>
                <Button variant="ghost" size="sm">
                  <Briefcase className="w-3.5 h-3.5" />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
