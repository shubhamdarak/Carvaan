"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  FileText,
  CheckSquare,
  BarChart2,
  CreditCard,
  ArrowRight,
  CheckCircle,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: Search,
    title: "Find the exact creators your brand needs",
    description:
      "Filter the Carvaan creator database by niche, location, follower range, engagement rate, audience demographics, and brand fit score. Stop guessing, start matching.",
  },
  {
    icon: FileText,
    title: "Create structured campaign briefs",
    description:
      "Use the Carvaan brief builder to define your campaign objectives, deliverables, content guidelines, hashtags, and key messages. Keep everyone aligned from day one.",
  },
  {
    icon: CheckSquare,
    title: "Approve content before it goes live",
    description:
      "Review all creator content through a structured approval workflow. Request revisions, leave comments, and give final approval, all documented and tracked.",
  },
  {
    icon: BarChart2,
    title: "Track every metric that matters",
    description:
      "Monitor campaign reach, views, engagement, clicks, coupon redemptions, leads, and sales. Every campaign metric is tied back to the creator and content that drove it.",
  },
  {
    icon: CreditCard,
    title: "Manage creator payments transparently",
    description:
      "Track agreed creator rates, bonus conditions, invoice status, and payment approvals in one place. No more spreadsheet payment management.",
  },
];

const metrics = [
  { value: "30+", label: "Creator niches tracked" },
  { value: "4", label: "Platforms supported" },
  { value: "15", label: "Campaign workflow stages" },
  { value: "GCC", label: "Regional focus" },
];

const workflow = [
  { step: "01", label: "Define campaign objective and brief" },
  { step: "02", label: "Discover and shortlist relevant creators" },
  { step: "03", label: "Launch outreach and manage negotiations" },
  { step: "04", label: "Review and approve creator content" },
  { step: "05", label: "Monitor live campaign performance" },
  { step: "06", label: "Generate performance reports" },
];

export default function BrandsPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="py-16 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="inline-flex items-center bg-teal-50 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-teal-200 mb-6">
              For Brands
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#080f1e] leading-tight">
              Run influencer campaigns that are structured, trackable, and results-driven.
            </h1>
            <p className="mt-5 text-lg text-slate-500 max-w-2xl leading-relaxed">
              Carvaan gives brands a professional platform to manage every stage of a creator campaign, from discovery to final performance report, without the chaos of scattered tools.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/login">
                <Button variant="primary" size="lg">
                  Start as a Brand
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" size="lg">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="border-b border-slate-100 py-10 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {metrics.map((m) => (
              <div key={m.label} className="text-center">
                <p className="text-3xl font-bold text-[#0f1e38]">{m.value}</p>
                <p className="text-sm text-slate-500 mt-1">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#080f1e]">
              Everything a brand needs to run creator campaigns properly
            </h2>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto">
              From campaign brief creation to ROI tracking, Carvaan structures the entire process so your team moves faster and your campaigns deliver better results.
            </p>
          </div>
          <div className="space-y-8">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-6 items-start p-6 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all"
              >
                <div className="w-11 h-11 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <b.icon className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#0f1e38] text-base mb-2">{b.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">{b.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#080f1e]">Your campaign workflow, end to end</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {workflow.map((w) => (
              <div key={w.step} className="flex items-center gap-4 bg-white rounded-xl p-4 border border-slate-200 shadow-card">
                <span className="text-2xl font-bold text-slate-200">{w.step}</span>
                <p className="text-sm font-medium text-slate-700">{w.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-[#080f1e]">
            Ready to run your first campaign on Carvaan?
          </h2>
          <p className="mt-4 text-slate-500">
            Create your brand account and start discovering creators in minutes.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/signup">
              <Button variant="primary" size="lg">
                Create Brand Account
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
