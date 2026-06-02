"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X, Plus, Eye, Users, Globe, Star } from "lucide-react";
import { creators } from "@/data/creators";
import type { Creator, Platform, Niche } from "@/types";
import { formatNumber, formatCurrency, formatPercent, cn } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { PlatformIcon } from "@/components/ui/platform-icon";

const niches: Niche[] = ["Beauty", "Fashion", "Fitness", "Food", "Travel", "Automotive", "Real Estate", "Lifestyle", "Parenting", "Technology", "Health & Wellness", "Luxury", "Hospitality", "Education", "Finance"];
const countries = ["UAE", "Saudi Arabia", "Kuwait", "Qatar", "Bahrain", "Oman"];
const platforms: Platform[] = ["instagram", "tiktok", "youtube", "snapchat"];

function CreatorCard({ creator, onView, onShortlist, shortlisted }: {
  creator: Creator;
  onView: () => void;
  onShortlist: () => void;
  shortlisted: boolean;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-card-hover hover:border-slate-300 transition-all">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-11 h-11 bg-gradient-to-br from-[#d5e0f1] to-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-[#1e3d72] font-bold text-sm">{creator.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2)}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-semibold text-slate-900 truncate">{creator.fullName}</p>
            {creator.verificationStatus === "verified" && (
              <svg className="w-3.5 h-3.5 text-teal-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <p className="text-xs text-slate-500 truncate">{creator.instagramHandle || creator.tiktokHandle || creator.snapchatHandle}</p>
        </div>
        <div className="flex items-center gap-1">
          <div className={cn("text-xs font-bold px-2 py-1 rounded-lg", creator.brandFitScore >= 85 ? "bg-emerald-100 text-emerald-700" : creator.brandFitScore >= 70 ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600")}>
            {creator.brandFitScore}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">{creator.niche}</span>
        <span className="text-xs text-slate-500 flex items-center gap-1">
          <Globe className="w-3 h-3" />
          {creator.city}, {creator.country}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="text-center bg-slate-50 rounded-lg py-2">
          <p className="text-xs text-slate-500">Followers</p>
          <p className="text-sm font-bold text-slate-800">{formatNumber(creator.followerCount)}</p>
        </div>
        <div className="text-center bg-slate-50 rounded-lg py-2">
          <p className="text-xs text-slate-500">Engagement</p>
          <p className="text-sm font-bold text-slate-800">{formatPercent(creator.engagementRate)}</p>
        </div>
        <div className="text-center bg-slate-50 rounded-lg py-2">
          <p className="text-xs text-slate-500">Avg Views</p>
          <p className="text-sm font-bold text-slate-800">{formatNumber(creator.averageViews)}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-1">
          <PlatformIcon platform={creator.primaryPlatform} size="sm" />
          {creator.instagramHandle && creator.primaryPlatform !== "instagram" && <PlatformIcon platform="instagram" size="sm" />}
          {creator.tiktokHandle && creator.primaryPlatform !== "tiktok" && <PlatformIcon platform="tiktok" size="sm" />}
          {creator.youtubeChannel && creator.primaryPlatform !== "youtube" && <PlatformIcon platform="youtube" size="sm" />}
        </div>
        <span className="text-xs text-slate-500 font-medium">
          {formatCurrency(creator.ratePerReel, "AED")}/reel
        </span>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onView} className="flex-1">
          <Eye className="w-3.5 h-3.5" />
          View
        </Button>
        <Button
          variant={shortlisted ? "ghost" : "primary"}
          size="sm"
          onClick={onShortlist}
          className="flex-1"
        >
          <Plus className="w-3.5 h-3.5" />
          {shortlisted ? "Shortlisted" : "Shortlist"}
        </Button>
      </div>
    </div>
  );
}

function CreatorModal({ creator, onClose, onShortlist, shortlisted }: {
  creator: Creator;
  onClose: () => void;
  onShortlist: () => void;
  shortlisted: boolean;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Creator Profile</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#d5e0f1] to-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-[#1e3d72] font-bold text-xl">{creator.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2)}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">{creator.fullName}</h3>
                {creator.verificationStatus === "verified" && (
                  <span className="text-xs bg-teal-50 text-teal-700 border border-teal-200 px-2 py-0.5 rounded-full font-medium">Verified</span>
                )}
                <span className={cn("text-sm font-bold px-2.5 py-1 rounded-lg ml-auto", creator.brandFitScore >= 85 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700")}>
                  Fit Score: {creator.brandFitScore}
                </span>
              </div>
              <p className="text-sm text-slate-500">{creator.instagramHandle || creator.tiktokHandle}</p>
              <p className="text-sm text-slate-600 mt-1">{creator.bio}</p>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "Followers", value: formatNumber(creator.followerCount) },
              { label: "Avg Views", value: formatNumber(creator.averageViews) },
              { label: "Engagement", value: formatPercent(creator.engagementRate) },
              { label: "Country", value: creator.country },
            ].map((m) => (
              <div key={m.label} className="bg-slate-50 rounded-xl p-3 text-center">
                <p className="text-xs text-slate-500">{m.label}</p>
                <p className="text-sm font-bold text-slate-900 mt-0.5">{m.value}</p>
              </div>
            ))}
          </div>

          {/* Audience */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3">Audience Gender</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden flex">
                  <div className="h-full bg-pink-400" style={{ width: `${creator.audienceGenderSplit.female}%` }} />
                  <div className="h-full bg-sky-400" style={{ width: `${creator.audienceGenderSplit.male}%` }} />
                </div>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-slate-500">Female {creator.audienceGenderSplit.female}%</span>
                <span className="text-xs text-slate-500">Male {creator.audienceGenderSplit.male}%</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3">Top Audience Countries</p>
              <div className="flex flex-wrap gap-1.5">
                {creator.topAudienceCountries.map((c) => (
                  <span key={c} className="text-xs bg-[#eef2f9] text-[#1e3d72] px-2 py-0.5 rounded-full">{c}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div>
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3">Pricing</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Reel/TikTok", value: creator.ratePerReel },
                { label: "Feed Post", value: creator.ratePerPost },
                { label: "Story (x3)", value: creator.ratePerStory * 3 },
              ].map((p) => (
                p.value > 0 && (
                  <div key={p.label} className="bg-slate-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-slate-500">{p.label}</p>
                    <p className="text-sm font-bold text-slate-900">{formatCurrency(p.value, "AED")}</p>
                  </div>
                )
              ))}
            </div>
          </div>

          {/* Past collabs */}
          {creator.pastCollaborations.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Past Collaborations</p>
              <div className="flex flex-wrap gap-1.5">
                {creator.pastCollaborations.map((c) => (
                  <span key={c} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">{c}</span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2 border-t border-slate-100">
            <Button variant="outline" size="md" onClick={onClose} className="flex-1">Close</Button>
            <Button
              variant={shortlisted ? "secondary" : "primary"}
              size="md"
              onClick={onShortlist}
              className="flex-1"
            >
              <Plus className="w-4 h-4" />
              {shortlisted ? "Remove from Shortlist" : "Add to Shortlist"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CreatorDiscovery() {
  const [search, setSearch] = useState("");
  const [filterPlatform, setFilterPlatform] = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  const [filterNiche, setFilterNiche] = useState("");
  const [filterMinFollowers, setFilterMinFollowers] = useState("");
  const [filterMaxRate, setFilterMaxRate] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [shortlisted, setShortlisted] = useState<Set<string>>(new Set());
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);

  const filtered = useMemo(() => {
    return creators.filter((c) => {
      const q = search.toLowerCase();
      if (q && !c.fullName.toLowerCase().includes(q) && !c.niche.toLowerCase().includes(q) && !c.city.toLowerCase().includes(q) && !c.displayName.toLowerCase().includes(q)) return false;
      if (filterPlatform && c.primaryPlatform !== filterPlatform && !((filterPlatform === "instagram" && c.instagramHandle) || (filterPlatform === "tiktok" && c.tiktokHandle) || (filterPlatform === "youtube" && c.youtubeChannel) || (filterPlatform === "snapchat" && c.snapchatHandle))) return false;
      if (filterCountry && c.country !== filterCountry) return false;
      if (filterNiche && c.niche !== filterNiche) return false;
      if (filterMinFollowers && c.followerCount < parseInt(filterMinFollowers)) return false;
      if (filterMaxRate && c.ratePerReel > parseInt(filterMaxRate)) return false;
      return true;
    });
  }, [search, filterPlatform, filterCountry, filterNiche, filterMinFollowers, filterMaxRate]);

  const toggleShortlist = (id: string) => {
    setShortlisted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const clearFilters = () => {
    setFilterPlatform("");
    setFilterCountry("");
    setFilterNiche("");
    setFilterMinFollowers("");
    setFilterMaxRate("");
    setSearch("");
  };

  const hasFilters = filterPlatform || filterCountry || filterNiche || filterMinFollowers || filterMaxRate;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Creator Discovery</h1>
          <p className="text-sm text-slate-500">{filtered.length} creators found</p>
        </div>
        <div className="flex items-center gap-2">
          {shortlisted.size > 0 && (
            <span className="text-sm bg-teal-50 text-teal-700 border border-teal-200 px-3 py-1.5 rounded-lg font-medium">
              {shortlisted.size} shortlisted
            </span>
          )}
        </div>
      </div>

      {/* Search + filter bar */}
      <div className="flex gap-3 flex-wrap">
        <div className="flex-1 min-w-64 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, niche, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
          />
        </div>
        <Button
          variant={showFilters ? "secondary" : "outline"}
          size="md"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {hasFilters && <span className="bg-teal-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">!</span>}
        </Button>
        {hasFilters && (
          <Button variant="ghost" size="md" onClick={clearFilters}>
            <X className="w-4 h-4" />
            Clear
          </Button>
        )}
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="bg-white border border-slate-200 rounded-xl p-4 grid grid-cols-2 md:grid-cols-5 gap-4">
          <Select label="Platform" options={platforms.map((p) => ({ value: p, label: p.charAt(0).toUpperCase() + p.slice(1) }))} placeholder="All platforms" value={filterPlatform} onChange={(e) => setFilterPlatform(e.target.value)} />
          <Select label="Country" options={countries.map((c) => ({ value: c, label: c }))} placeholder="All countries" value={filterCountry} onChange={(e) => setFilterCountry(e.target.value)} />
          <Select label="Niche" options={niches.map((n) => ({ value: n, label: n }))} placeholder="All niches" value={filterNiche} onChange={(e) => setFilterNiche(e.target.value)} />
          <Input label="Min. Followers" type="number" placeholder="e.g. 50000" value={filterMinFollowers} onChange={(e) => setFilterMinFollowers(e.target.value)} />
          <Input label="Max Rate/Reel (AED)" type="number" placeholder="e.g. 10000" value={filterMaxRate} onChange={(e) => setFilterMaxRate(e.target.value)} />
        </div>
      )}

      {/* Creator grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <Users className="w-10 h-10 mx-auto mb-3 text-slate-300" />
          <p className="font-medium">No creators match your filters</p>
          <p className="text-sm mt-1">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((creator) => (
            <CreatorCard
              key={creator.id}
              creator={creator}
              onView={() => setSelectedCreator(creator)}
              onShortlist={() => toggleShortlist(creator.id)}
              shortlisted={shortlisted.has(creator.id)}
            />
          ))}
        </div>
      )}

      {/* Creator modal */}
      {selectedCreator && (
        <CreatorModal
          creator={selectedCreator}
          onClose={() => setSelectedCreator(null)}
          onShortlist={() => toggleShortlist(selectedCreator.id)}
          shortlisted={shortlisted.has(selectedCreator.id)}
        />
      )}
    </div>
  );
}
