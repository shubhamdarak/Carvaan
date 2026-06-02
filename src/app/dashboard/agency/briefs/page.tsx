"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Select } from "@/components/ui/input";
import { FileText, Download, Copy } from "lucide-react";

const objectiveOptions = [
  { value: "brand_awareness", label: "Brand Awareness" },
  { value: "product_launch", label: "Product Launch" },
  { value: "sales_conversion", label: "Sales / Conversions" },
  { value: "engagement", label: "Community Engagement" },
  { value: "lead_generation", label: "Lead Generation" },
  { value: "event_promotion", label: "Event Promotion" },
];

const toneOptions = [
  { value: "professional", label: "Professional and authoritative" },
  { value: "friendly", label: "Friendly and approachable" },
  { value: "aspirational", label: "Aspirational and elevated" },
  { value: "educational", label: "Educational and informative" },
  { value: "playful", label: "Playful and entertaining" },
];

export default function BriefGeneratorPage() {
  const [form, setForm] = useState({
    brandName: "", campaignName: "", objective: "", keyMessage: "",
    tone: "", dos: "", donts: "", deliverables: "", postingDate: "",
    contentDeadline: "", hashtags: "", mentions: "", cta: "",
    productDetails: "", brandOverview: "",
  });
  const [generated, setGenerated] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateBrief = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setGenerated(`
CAMPAIGN BRIEF
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Campaign: ${form.campaignName || "[Campaign Name]"}
Brand: ${form.brandName || "[Brand Name]"}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BRAND OVERVIEW
${form.brandOverview || "[Brand overview and positioning will appear here based on your input.]"}

CAMPAIGN OBJECTIVE
${form.objective ? objectiveOptions.find((o) => o.value === form.objective)?.label : "[Campaign objective will appear here]"}

KEY MESSAGE
${form.keyMessage || "[Core message for the campaign]"}

TONE OF VOICE
${form.tone ? toneOptions.find((t) => t.value === form.tone)?.label : "[Tone direction]"}

PRODUCT / SERVICE DETAILS
${form.productDetails || "[Product or service details will appear here]"}

DELIVERABLES
${form.deliverables || "[Deliverables list will appear here, e.g. 2x Instagram Reels, 4x Stories]"}

CONTENT GUIDELINES

DO:
${form.dos ? form.dos.split("\n").map((l) => `- ${l}`).join("\n") : "- Reflect the brand's values and tone\n- Show the product clearly\n- Include the required hashtags and mentions"}

DO NOT:
${form.donts ? form.donts.split("\n").map((l) => `- ${l}`).join("\n") : "- Do not make medical or exaggerated claims\n- Do not tag competitor brands\n- Do not use heavy filters that misrepresent the product"}

HASHTAGS
${form.hashtags || "[Campaign hashtags, provided by the brand team]"}

REQUIRED MENTIONS
${form.mentions || "[Accounts to tag in posts]"}

CALL TO ACTION
${form.cta || "[CTA instruction, e.g. 'Direct followers to use coupon code BRAND20 at checkout']"}

IMPORTANT DATES
Content Submission Deadline: ${form.contentDeadline || "[TBD]"}
Posting Window: ${form.postingDate || "[TBD]"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUESTIONS AND APPROVALS
Please submit draft content via the Carvaan platform for review before posting. Direct communication for questions via your assigned campaign manager.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
    }, 1000);
  };

  const copyBrief = () => {
    if (generated) navigator.clipboard.writeText(generated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Brief Generator</h1>
        <p className="text-sm text-slate-500">Fill in the campaign details to generate a professional creator brief</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Brand Name" placeholder="e.g. Gleam Skincare" value={form.brandName} onChange={(e) => setForm({ ...form, brandName: e.target.value })} />
            <Input label="Campaign Name" placeholder="e.g. Night Recovery Launch" value={form.campaignName} onChange={(e) => setForm({ ...form, campaignName: e.target.value })} />
          </div>
          <Select label="Campaign Objective" options={objectiveOptions} placeholder="Select objective" value={form.objective} onChange={(e) => setForm({ ...form, objective: e.target.value })} />
          <Textarea label="Brand Overview" placeholder="Describe the brand, its positioning, and what it stands for..." value={form.brandOverview} onChange={(e) => setForm({ ...form, brandOverview: e.target.value })} />
          <Input label="Key Message" placeholder="One sentence, the core message creators must communicate" value={form.keyMessage} onChange={(e) => setForm({ ...form, keyMessage: e.target.value })} />
          <Select label="Tone of Voice" options={toneOptions} placeholder="Select tone" value={form.tone} onChange={(e) => setForm({ ...form, tone: e.target.value })} />
          <Textarea label="Product / Service Details" placeholder="Describe the product or service being promoted..." value={form.productDetails} onChange={(e) => setForm({ ...form, productDetails: e.target.value })} />
          <Textarea label="Deliverables" placeholder="e.g. 2x Instagram Reels, 4x Stories, 1x TikTok video" value={form.deliverables} onChange={(e) => setForm({ ...form, deliverables: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Textarea label="Do's (one per line)" placeholder="Show texture and close-ups&#10;Film in natural light&#10;Use provided product images" value={form.dos} onChange={(e) => setForm({ ...form, dos: e.target.value })} />
            <Textarea label="Don'ts (one per line)" placeholder="No heavy filters&#10;No competitor mentions&#10;No before/after health claims" value={form.donts} onChange={(e) => setForm({ ...form, donts: e.target.value })} />
          </div>
          <Input label="Required Hashtags" placeholder="#BrandName #CampaignName #GCC" value={form.hashtags} onChange={(e) => setForm({ ...form, hashtags: e.target.value })} />
          <Input label="Required Mentions" placeholder="@brandhandle" value={form.mentions} onChange={(e) => setForm({ ...form, mentions: e.target.value })} />
          <Input label="Call to Action" placeholder="e.g. Use coupon code BRAND20 at checkout" value={form.cta} onChange={(e) => setForm({ ...form, cta: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Content Submission Deadline" type="date" value={form.contentDeadline} onChange={(e) => setForm({ ...form, contentDeadline: e.target.value })} />
            <Input label="Posting Window" placeholder="e.g. June 1–15, 2025" value={form.postingDate} onChange={(e) => setForm({ ...form, postingDate: e.target.value })} />
          </div>
          <Button variant="primary" size="md" className="w-full" onClick={generateBrief} loading={loading}>
            <FileText className="w-4 h-4" />
            Generate Campaign Brief
          </Button>
        </div>

        {/* Preview */}
        <div className="sticky top-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-card overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50">
              <p className="text-sm font-semibold text-slate-700">Brief Preview</p>
              {generated && (
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={copyBrief}>
                    <Copy className="w-3.5 h-3.5" />
                    Copy
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-3.5 h-3.5" />
                    Export
                  </Button>
                </div>
              )}
            </div>
            <div className="p-4">
              {generated ? (
                <pre className="text-xs text-slate-700 leading-relaxed font-mono whitespace-pre-wrap">{generated}</pre>
              ) : (
                <div className="py-16 text-center text-slate-400">
                  <FileText className="w-10 h-10 mx-auto mb-3 text-slate-200" />
                  <p className="text-sm">Fill in the form and click Generate to preview the brief</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
