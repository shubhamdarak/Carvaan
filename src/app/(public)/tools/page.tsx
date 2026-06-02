"use client";

import { useState } from "react";
import { Calculator, Target, Shield, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Tool 1: Engagement Rate Calculator
function EngagementCalculator() {
  const [form, setForm] = useState({ followers: "", likes: "", comments: "", shares: "" });
  const [result, setResult] = useState<{ rate: number; quality: string; recommendation: string } | null>(null);

  const calculate = () => {
    const f = parseFloat(form.followers);
    const l = parseFloat(form.likes);
    const c = parseFloat(form.comments);
    const s = parseFloat(form.shares);
    if (!f || f === 0) return;
    const rate = ((l + c + s) / f) * 100;
    let quality = "";
    let recommendation = "";
    if (rate >= 6) {
      quality = "Excellent";
      recommendation = "This creator has outstanding engagement. Ideal for high-trust brand campaigns where audience connection is critical.";
    } else if (rate >= 3.5) {
      quality = "Strong";
      recommendation = "Above-average engagement. This creator drives genuine audience interaction, a strong candidate for most campaigns.";
    } else if (rate >= 1.5) {
      quality = "Average";
      recommendation = "Typical for accounts at this size. Engagement is acceptable, but review content quality and audience authenticity closely.";
    } else {
      quality = "Below Average";
      recommendation = "Lower engagement relative to follower size. Consider whether the audience is active. Useful for high-reach awareness plays with realistic expectations.";
    }
    setResult({ rate, quality, recommendation });
  };

  const qualityColor: Record<string, string> = {
    Excellent: "text-emerald-600 bg-emerald-50 border-emerald-200",
    Strong: "text-teal-600 bg-teal-50 border-teal-200",
    Average: "text-amber-600 bg-amber-50 border-amber-200",
    "Below Average": "text-red-600 bg-red-50 border-red-200",
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <Input label="Total Followers" type="number" placeholder="e.g. 150000" value={form.followers} onChange={(e) => setForm({ ...form, followers: e.target.value })} />
        <Input label="Average Likes per Post" type="number" placeholder="e.g. 4500" value={form.likes} onChange={(e) => setForm({ ...form, likes: e.target.value })} />
        <Input label="Average Comments per Post" type="number" placeholder="e.g. 280" value={form.comments} onChange={(e) => setForm({ ...form, comments: e.target.value })} />
        <Input label="Average Shares per Post" type="number" placeholder="e.g. 120" value={form.shares} onChange={(e) => setForm({ ...form, shares: e.target.value })} />
      </div>
      <Button onClick={calculate} variant="primary" size="md">
        Calculate Engagement Rate
      </Button>
      {result && (
        <div className={cn("rounded-xl border p-5", qualityColor[result.quality])}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold">Engagement Rate</span>
            <span className="text-2xl font-bold">{result.rate.toFixed(2)}%</span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full border font-bold">{result.quality}</span>
          </div>
          <p className="text-sm leading-relaxed">{result.recommendation}</p>
        </div>
      )}
    </div>
  );
}

// Tool 2: Brand Fit Checker
function BrandFitChecker() {
  const [form, setForm] = useState({
    brandIndustry: "", targetCountry: "", targetAge: "", targetGender: "",
    creatorNiche: "", audienceCountry: "", engagementRate: "",
  });
  const [result, setResult] = useState<{ score: number; explanation: string; warning: string; suggestion: string } | null>(null);

  const industryOptions = [
    { value: "Beauty & Skincare", label: "Beauty & Skincare" },
    { value: "Fashion", label: "Fashion" },
    { value: "Fitness & Wellness", label: "Fitness & Wellness" },
    { value: "Food & Beverage", label: "Food & Beverage" },
    { value: "Technology", label: "Technology" },
    { value: "Automotive", label: "Automotive" },
    { value: "Real Estate", label: "Real Estate" },
    { value: "Hospitality", label: "Hospitality" },
    { value: "Finance", label: "Finance" },
    { value: "Education", label: "Education" },
  ];

  const countryOptions = [
    { value: "UAE", label: "UAE" },
    { value: "Saudi Arabia", label: "Saudi Arabia" },
    { value: "Kuwait", label: "Kuwait" },
    { value: "Qatar", label: "Qatar" },
    { value: "Bahrain", label: "Bahrain" },
    { value: "Oman", label: "Oman" },
  ];

  const nicheOptions = [
    { value: "Beauty", label: "Beauty" },
    { value: "Fashion", label: "Fashion" },
    { value: "Fitness", label: "Fitness" },
    { value: "Food", label: "Food" },
    { value: "Technology", label: "Technology" },
    { value: "Automotive", label: "Automotive" },
    { value: "Real Estate", label: "Real Estate" },
    { value: "Lifestyle", label: "Lifestyle" },
    { value: "Health & Wellness", label: "Health & Wellness" },
    { value: "Finance", label: "Finance" },
  ];

  const nicheMatch: Record<string, string[]> = {
    "Beauty & Skincare": ["Beauty"],
    "Fashion": ["Fashion", "Lifestyle"],
    "Fitness & Wellness": ["Fitness", "Health & Wellness"],
    "Food & Beverage": ["Food"],
    "Technology": ["Technology"],
    "Automotive": ["Automotive"],
    "Real Estate": ["Real Estate"],
    "Hospitality": ["Lifestyle", "Food"],
    "Finance": ["Finance"],
    "Education": ["Lifestyle"],
  };

  const check = () => {
    let score = 0;
    const niche = nicheMatch[form.brandIndustry] || [];
    const nicheMatches = niche.includes(form.creatorNiche);
    if (nicheMatches) score += 30;
    if (form.targetCountry && form.audienceCountry && form.targetCountry === form.audienceCountry) score += 25;
    const er = parseFloat(form.engagementRate);
    if (er >= 5) score += 25;
    else if (er >= 3) score += 15;
    else if (er >= 1.5) score += 8;
    if (form.targetGender === "female" || form.targetGender === "male") score += 10;
    if (form.targetAge) score += 10;
    score = Math.min(score, 100);
    const warning = score < 50 ? "Low match detected. Niche, location, or engagement may not align well with this brand." : score < 70 ? "Moderate match. Review audience demographics carefully before committing budget." : "";
    const suggestion = nicheMatches ? `This creator's ${form.creatorNiche} content aligns with ${form.brandIndustry} brand needs.` : `Niche mismatch: ${form.brandIndustry} brands typically work best with ${niche.join(", ")} creators.`;
    setResult({ score, explanation: `Fit score based on niche alignment, audience location, engagement rate, and demographic targeting.`, warning, suggestion });
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <Select label="Brand Industry" options={industryOptions} placeholder="Select industry" value={form.brandIndustry} onChange={(e) => setForm({ ...form, brandIndustry: e.target.value })} />
        <Select label="Target Country" options={countryOptions} placeholder="Select country" value={form.targetCountry} onChange={(e) => setForm({ ...form, targetCountry: e.target.value })} />
        <Input label="Target Age Range" placeholder="e.g. 18–34" value={form.targetAge} onChange={(e) => setForm({ ...form, targetAge: e.target.value })} />
        <Select label="Target Gender" options={[{ value: "female", label: "Female" }, { value: "male", label: "Male" }, { value: "all", label: "All" }]} placeholder="Select gender" value={form.targetGender} onChange={(e) => setForm({ ...form, targetGender: e.target.value })} />
        <Select label="Creator Niche" options={nicheOptions} placeholder="Select niche" value={form.creatorNiche} onChange={(e) => setForm({ ...form, creatorNiche: e.target.value })} />
        <Select label="Creator Audience Country" options={countryOptions} placeholder="Select country" value={form.audienceCountry} onChange={(e) => setForm({ ...form, audienceCountry: e.target.value })} />
        <Input label="Creator Engagement Rate (%)" type="number" placeholder="e.g. 4.2" value={form.engagementRate} onChange={(e) => setForm({ ...form, engagementRate: e.target.value })} />
      </div>
      <Button onClick={check} variant="primary" size="md">Check Brand Fit</Button>
      {result && (
        <div className="rounded-xl border border-slate-200 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-700">Brand Fit Score</span>
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold text-[#0f1e38]">{result.score}</div>
              <span className="text-sm text-slate-500">/ 100</span>
            </div>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className={cn("h-full rounded-full transition-all", result.score >= 70 ? "bg-emerald-500" : result.score >= 50 ? "bg-amber-500" : "bg-red-400")} style={{ width: `${result.score}%` }} />
          </div>
          <p className="text-sm text-slate-600">{result.suggestion}</p>
          {result.warning && <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-700">{result.warning}</div>}
          <p className="text-xs text-slate-400">{result.explanation}</p>
        </div>
      )}
    </div>
  );
}

// Tool 3: Creator Authenticity Checker
function AuthenticityChecker() {
  const [form, setForm] = useState({ followers: "", avgLikes: "", avgComments: "", avgViews: "", audienceMatch: "" });
  const [result, setResult] = useState<{ score: number; flags: string[]; recommendation: string } | null>(null);

  const check = () => {
    const followers = parseFloat(form.followers);
    const likes = parseFloat(form.avgLikes);
    const comments = parseFloat(form.avgComments);
    const views = parseFloat(form.avgViews);
    if (!followers) return;
    let score = 100;
    const flags: string[] = [];
    const er = ((likes + comments) / followers) * 100;
    if (er < 0.5) { score -= 30; flags.push("Engagement rate is extremely low for follower count, possible inactive or purchased followers."); }
    if (likes > 0 && comments / likes < 0.02) { score -= 15; flags.push("Comment-to-like ratio is unusually low, comments may be suppressed or engagement may be pod-based."); }
    if (views > 0 && views / followers < 0.05) { score -= 20; flags.push("Views are significantly lower than follower count, content reach may be affected by low organic distribution."); }
    if (form.audienceMatch === "low") { score -= 20; flags.push("Audience location does not match target market, campaign reach may not convert to relevant impressions."); }
    score = Math.max(score, 0);
    const recommendation = score >= 80 ? "This creator's metrics appear consistent and authentic. Proceed with standard due diligence." : score >= 55 ? "Moderate authenticity signals. Review content comments manually and verify audience demographics before committing." : "Several red flags detected. Conduct deeper audience verification before onboarding this creator.";
    setResult({ score, flags, recommendation });
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <Input label="Total Followers" type="number" placeholder="e.g. 200000" value={form.followers} onChange={(e) => setForm({ ...form, followers: e.target.value })} />
        <Input label="Average Likes per Post" type="number" placeholder="e.g. 3500" value={form.avgLikes} onChange={(e) => setForm({ ...form, avgLikes: e.target.value })} />
        <Input label="Average Comments per Post" type="number" placeholder="e.g. 180" value={form.avgComments} onChange={(e) => setForm({ ...form, avgComments: e.target.value })} />
        <Input label="Average Video Views" type="number" placeholder="e.g. 25000" value={form.avgViews} onChange={(e) => setForm({ ...form, avgViews: e.target.value })} />
        <Select label="Audience Location Match" options={[{ value: "high", label: "High match, primarily target country" }, { value: "medium", label: "Moderate match, mixed countries" }, { value: "low", label: "Low match, mostly other regions" }]} placeholder="Select match level" value={form.audienceMatch} onChange={(e) => setForm({ ...form, audienceMatch: e.target.value })} />
      </div>
      <Button onClick={check} variant="primary" size="md">Check Authenticity</Button>
      {result && (
        <div className="rounded-xl border border-slate-200 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-700">Authenticity Score</span>
            <div className="flex items-center gap-2">
              <div className={cn("text-3xl font-bold", result.score >= 80 ? "text-emerald-600" : result.score >= 55 ? "text-amber-600" : "text-red-600")}>{result.score}</div>
              <span className="text-sm text-slate-500">/ 100</span>
            </div>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className={cn("h-full rounded-full", result.score >= 80 ? "bg-emerald-500" : result.score >= 55 ? "bg-amber-500" : "bg-red-500")} style={{ width: `${result.score}%` }} />
          </div>
          {result.flags.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Red Flags Detected</p>
              {result.flags.map((f, i) => (
                <div key={i} className="bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 text-sm text-red-700">{f}</div>
              ))}
            </div>
          )}
          <p className="text-sm text-slate-600 font-medium">{result.recommendation}</p>
        </div>
      )}
    </div>
  );
}

// Tool 4: Hashtag Analyzer
function HashtagAnalyzer() {
  const [form, setForm] = useState({ niche: "", location: "", platform: "" });
  const [result, setResult] = useState<{ hashtags: { tag: string; competition: string; category: string }[]; strategy: string } | null>(null);

  const hashtagData: Record<string, Record<string, { tag: string; competition: string; category: string }[]>> = {
    Beauty: {
      instagram: [
        { tag: "#SkincareUAE", competition: "Medium", category: "Local" },
        { tag: "#BeautyGCC", competition: "Medium", category: "Regional" },
        { tag: "#MakeupDubai", competition: "Low", category: "Local" },
        { tag: "#ArabBeauty", competition: "High", category: "Regional" },
        { tag: "#SkincareRoutine", competition: "High", category: "Broad" },
        { tag: "#NaturalSkincare", competition: "High", category: "Broad" },
        { tag: "#GlowUp", competition: "High", category: "Trending" },
        { tag: "#SkincareAddict", competition: "High", category: "Community" },
      ],
      tiktok: [
        { tag: "#SkincareUAE", competition: "Low", category: "Local" },
        { tag: "#BeautyGCC", competition: "Low", category: "Regional" },
        { tag: "#SkincareTikTok", competition: "Medium", category: "Platform" },
        { tag: "#GlowTok", competition: "High", category: "Trending" },
        { tag: "#ArabicSkincare", competition: "Low", category: "Niche" },
        { tag: "#SkincareReview", competition: "Medium", category: "Review" },
      ],
    },
    Food: {
      instagram: [
        { tag: "#FoodUAE", competition: "High", category: "Local" },
        { tag: "#DubaiFood", competition: "High", category: "Local" },
        { tag: "#ArabicFood", competition: "Medium", category: "Cultural" },
        { tag: "#FoodPhotography", competition: "High", category: "Broad" },
        { tag: "#EatDubai", competition: "Medium", category: "Local" },
        { tag: "#RestaurantReview", competition: "Medium", category: "Category" },
        { tag: "#HomeCooking", competition: "High", category: "Lifestyle" },
        { tag: "#GCCFood", competition: "Low", category: "Regional" },
      ],
      tiktok: [
        { tag: "#FoodTikTok", competition: "High", category: "Platform" },
        { tag: "#DubaiEats", competition: "Medium", category: "Local" },
        { tag: "#ArabicRecipes", competition: "Low", category: "Cultural" },
        { tag: "#GCCFood", competition: "Low", category: "Regional" },
        { tag: "#FoodReview", competition: "High", category: "Category" },
      ],
    },
    Fitness: {
      instagram: [
        { tag: "#FitnessUAE", competition: "Medium", category: "Local" },
        { tag: "#GymDubai", competition: "Medium", category: "Local" },
        { tag: "#GCCFitness", competition: "Low", category: "Regional" },
        { tag: "#WorkoutRoutine", competition: "High", category: "Category" },
        { tag: "#FitArabia", competition: "Low", category: "Regional" },
        { tag: "#FitLife", competition: "High", category: "Lifestyle" },
        { tag: "#GymMotivation", competition: "High", category: "Motivational" },
        { tag: "#ProteinUAE", competition: "Low", category: "Product" },
      ],
    },
  };

  const defaultHashtags = [
    { tag: "#UAE", competition: "High", category: "Location" },
    { tag: "#Dubai", competition: "High", category: "Location" },
    { tag: "#GCC", competition: "Medium", category: "Regional" },
    { tag: "#SaudiArabia", competition: "High", category: "Location" },
    { tag: "#ContentCreator", competition: "High", category: "Creator" },
  ];

  const generate = () => {
    const nicheData = hashtagData[form.niche];
    const platformData = nicheData ? nicheData[form.platform] : null;
    const tags = platformData ? [...platformData, ...defaultHashtags.slice(0, 3)] : defaultHashtags;
    setResult({
      hashtags: tags,
      strategy: `For ${form.niche} content on ${form.platform} targeting ${form.location || "GCC"}: Mix high-competition broad hashtags with low-competition local and niche-specific tags. Use 8–12 hashtags on Instagram, 3–5 on TikTok. Include one branded hashtag per campaign. Post during evening peak hours (7–10 PM local time) for maximum discovery.`,
    });
  };

  const nicheOptions = ["Beauty", "Fashion", "Fitness", "Food", "Travel", "Technology", "Automotive", "Lifestyle", "Health & Wellness", "Finance"].map((n) => ({ value: n, label: n }));
  const platformOptions = ["instagram", "tiktok", "youtube", "snapchat"].map((p) => ({ value: p, label: p.charAt(0).toUpperCase() + p.slice(1) }));
  const locationOptions = ["UAE", "Saudi Arabia", "Kuwait", "Qatar", "Bahrain", "Oman", "GCC Wide"].map((l) => ({ value: l, label: l }));

  const compColor: Record<string, string> = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-amber-100 text-amber-700",
    Low: "bg-emerald-100 text-emerald-700",
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-4">
        <Select label="Campaign Niche" options={nicheOptions} placeholder="Select niche" value={form.niche} onChange={(e) => setForm({ ...form, niche: e.target.value })} />
        <Select label="Target Location" options={locationOptions} placeholder="Select location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
        <Select label="Platform" options={platformOptions} placeholder="Select platform" value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value })} />
      </div>
      <Button onClick={generate} variant="primary" size="md">Generate Hashtags</Button>
      {result && (
        <div className="rounded-xl border border-slate-200 p-5 space-y-4">
          <p className="text-sm font-semibold text-slate-700">Suggested Hashtags</p>
          <div className="flex flex-wrap gap-2">
            {result.hashtags.map((h) => (
              <div key={h.tag} className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5">
                <span className="text-sm font-medium text-[#182f58]">{h.tag}</span>
                <span className={cn("text-xs px-1.5 py-0.5 rounded-full font-medium", compColor[h.competition])}>{h.competition}</span>
              </div>
            ))}
          </div>
          <div className="bg-[#eef2f9] border border-[#d5e0f1] rounded-lg p-4">
            <p className="text-xs font-semibold text-[#1e3d72] mb-2">Hashtag Strategy</p>
            <p className="text-sm text-[#182f58] leading-relaxed">{result.strategy}</p>
          </div>
        </div>
      )}
    </div>
  );
}

const tools = [
  { id: "engagement", icon: Calculator, title: "Engagement Rate Calculator", description: "Calculate any creator's engagement rate and get a quality rating with actionable recommendations.", component: EngagementCalculator },
  { id: "brandfit", icon: Target, title: "Brand Fit Checker", description: "Evaluate how well a creator matches your brand based on niche, audience, location, and engagement.", component: BrandFitChecker },
  { id: "authenticity", icon: Shield, title: "Creator Authenticity Checker", description: "Identify red flags in a creator's follower and engagement metrics before you commit your budget.", component: AuthenticityChecker },
  { id: "hashtag", icon: Hash, title: "Hashtag Analyzer", description: "Generate relevant, market-specific hashtag sets for GCC influencer campaigns with competition levels.", component: HashtagAnalyzer },
];

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState("engagement");
  const activeTool = tools.find((t) => t.id === activeTab)!;
  const ActiveComponent = activeTool.component;

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-slate-50 border-b border-slate-100 py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-xs font-semibold text-teal-600 uppercase tracking-widest">Free Tools</span>
          <h1 className="mt-3 text-4xl font-bold text-[#080f1e]">Creator marketing tools, free to use</h1>
          <p className="mt-4 text-slate-500 text-lg">
            Practical tools for brands and agencies making creator decisions. No account required.
          </p>
        </div>
      </section>

      {/* Tools tabs */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Tool selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTab(tool.id)}
                className={cn(
                  "p-4 rounded-xl border text-left transition-all",
                  activeTab === tool.id
                    ? "border-teal-500 bg-teal-50 ring-1 ring-teal-400"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                )}
              >
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center mb-3", activeTab === tool.id ? "bg-teal-600" : "bg-slate-100")}>
                  <tool.icon className={cn("w-4 h-4", activeTab === tool.id ? "text-white" : "text-slate-600")} />
                </div>
                <p className={cn("text-sm font-semibold", activeTab === tool.id ? "text-teal-900" : "text-slate-700")}>{tool.title}</p>
              </button>
            ))}
          </div>

          {/* Active tool */}
          <Card className="border-slate-200 shadow-card">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <activeTool.icon className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#0f1e38]">{activeTool.title}</h2>
                <p className="text-sm text-slate-500 mt-0.5">{activeTool.description}</p>
              </div>
            </div>
            <ActiveComponent />
          </Card>
        </div>
      </section>
    </div>
  );
}
