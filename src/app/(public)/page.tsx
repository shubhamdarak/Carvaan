"use client";

import Link from "next/link";
import { motion, type Variants, type Easing } from "framer-motion";
import {
  Search,
  MessageSquare,
  BarChart2,
  CreditCard,
  ArrowRight,
  CheckCircle,
  Users,
  Target,
  FileText,
  TrendingUp,
  Shield,
  Globe,
  Star,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as Easing } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const trustedBrands = [
  "Nahdi Care", "ProGear Arabia", "Gleam Skincare",
  "Sands & Co.", "AutoEdge KSA", "Vertex Realty",
  "Qasr Al Helou", "NestHQ",
];

const howItWorks = [
  {
    step: "01",
    title: "Discover the Right Creators",
    description:
      "Search and filter thousands of verified creators by niche, location, audience demographics, engagement rate, and brand fit score.",
    icon: Search,
  },
  {
    step: "02",
    title: "Manage Outreach and Negotiation",
    description:
      "Track outreach status across your pipeline, manage rate negotiations, and confirm creator deals, all in one place.",
    icon: MessageSquare,
  },
  {
    step: "03",
    title: "Approve Content Before It Goes Live",
    description:
      "Review submitted content, request revisions, and approve final deliverables through a structured content approval workflow.",
    icon: FileText,
  },
  {
    step: "04",
    title: "Track Performance and Report ROI",
    description:
      "Monitor campaign reach, engagement, clicks, and conversions. Generate professional client reports with a single click.",
    icon: BarChart2,
  },
];

const features = [
  { icon: Search, title: "Creator Discovery", description: "Filter by niche, location, followers, engagement, audience demographics, and brand fit, across Instagram, TikTok, YouTube, and Snapchat." },
  { icon: Target, title: "Campaign Management", description: "Create and manage influencer campaigns end-to-end with full status tracking across 15 workflow stages." },
  { icon: MessageSquare, title: "Outreach Pipeline", description: "Kanban-style creator outreach pipeline with stage tracking, follow-up reminders, and message templates." },
  { icon: FileText, title: "Content Approval", description: "Structured content review workflow with approval, revision requests, and inline commenting." },
  { icon: BarChart2, title: "Analytics and Reporting", description: "Track views, reach, engagement, clicks, conversions, ROI, and ROAS per creator and campaign." },
  { icon: CreditCard, title: "Creator Payments", description: "Manage creator invoices, agreed amounts, bonuses, and payment statuses with a clear approval trail." },
  { icon: Users, title: "Team Collaboration", description: "Multi-seat agency dashboard with role-based access for campaign managers, creator managers, analysts, and reviewers." },
  { icon: Globe, title: "Multi-Client Management", description: "Agencies can manage multiple brand clients under one account with separate campaign reporting and dashboards." },
];

const testimonials = [
  {
    quote: "Carvaan completely changed how we manage creator campaigns. The shortlist and approval features alone save our team hours every week.",
    name: "Amira Al Qassimi",
    role: "Founder, Maqsad Creative",
    company: "Agency",
  },
  {
    quote: "We used to manage everything across WhatsApp, spreadsheets, and email. Carvaan brought it all under one roof.",
    name: "Turki Al Anazi",
    role: "Marketing Director, Nahdi Care",
    company: "Brand",
  },
  {
    quote: "As a creator, knowing my campaign deliverables, deadlines, and payment status in one place makes everything much clearer.",
    name: "Layla Al Mansouri",
    role: "Content Creator, Dubai",
    company: "Creator",
  },
];

const faqs = [
  {
    question: "Who is Carvaan built for?",
    answer:
      "Carvaan is built for brands that run influencer campaigns, marketing agencies that manage creator partnerships, and content creators looking for professional collaborations. We serve the GCC market with a focus on UAE, Saudi Arabia, Kuwait, Qatar, Bahrain, and Oman.",
  },
  {
    question: "Does Carvaan connect to Instagram or TikTok directly?",
    answer:
      "In the current version, Carvaan operates with manually entered and verified creator data. API integrations with Instagram, TikTok, YouTube, and Snapchat are planned as a future feature. This approach ensures data accuracy and creator privacy.",
  },
  {
    question: "How does the Brand Fit Score work?",
    answer:
      "The Brand Fit Score is a proprietary scoring system that evaluates creator-to-brand compatibility based on niche alignment, audience country match, engagement quality, gender split relevance, and campaign objective fit. Scores range from 0 to 100.",
  },
  {
    question: "Can agencies manage multiple brand clients?",
    answer:
      "Yes. Agency accounts have a multi-client dashboard where each brand client has its own campaign space, creator shortlists, content approvals, and performance reports. Team roles and permissions can be assigned per team member.",
  },
  {
    question: "Is there a free plan available?",
    answer:
      "We offer a Starter plan with access to the core platform features. For agencies and brands with larger campaign volumes, our Growth, Business, and Enterprise plans provide expanded creator discovery, campaign limits, and dedicated support.",
  },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="text-sm font-semibold text-slate-800">{question}</span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 flex-shrink-0 ml-4 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-sky-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(32,164,176,0.08),rgba(255,255,255,0))]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp}>
                <span className="inline-flex items-center gap-1.5 bg-teal-50 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-teal-200 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  Built for the GCC Creator Economy
                </span>
              </motion.div>
              <motion.h1
                variants={fadeUp}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#080f1e] leading-tight tracking-tight"
              >
                Creator marketing,
                <br />
                <span className="text-teal-600">managed with clarity.</span>
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="mt-5 text-lg text-slate-600 leading-relaxed max-w-lg"
              >
                Carvaan helps brands and agencies discover the right creators, manage campaigns, approve content, and track performance, from one professional dashboard.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
                <Link href="/login">
                  <Button variant="primary" size="lg">
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" size="lg">
                    View Platform Demo
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                variants={fadeUp}
                className="mt-8 flex items-center gap-6 text-sm text-slate-500"
              >
                {["No setup fee", "GCC-focused", "All platforms"].map((item) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-teal-500" />
                    {item}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Dashboard preview mockup */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden">
                {/* Mockup header */}
                <div className="bg-[#080f1e] px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-slate-700" />
                    <div className="w-3 h-3 rounded-full bg-slate-700" />
                    <div className="w-3 h-3 rounded-full bg-slate-700" />
                  </div>
                  <div className="flex-1 bg-[#0f1e38] rounded-md h-5 mx-4 flex items-center px-2">
                    <span className="text-slate-500 text-[10px]">carvaan.io/dashboard</span>
                  </div>
                </div>
                {/* Mockup body */}
                <div className="p-4 bg-slate-50">
                  <div className="grid grid-cols-3 gap-2.5 mb-4">
                    {[
                      { label: "Active Campaigns", value: "12" },
                      { label: "Total Reach", value: "2.4M" },
                      { label: "Creator Pool", value: "847" },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-white rounded-lg p-3 border border-slate-200">
                        <p className="text-[10px] text-slate-500 font-medium">{stat.label}</p>
                        <p className="text-lg font-bold text-[#0f1e38] mt-0.5">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                  {/* Campaign rows */}
                  <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="text-xs font-semibold text-slate-700">Active Campaigns</p>
                    </div>
                    {[
                      { name: "Gleam Night Recovery", status: "Live", color: "bg-emerald-100 text-emerald-700" },
                      { name: "ProGear Protein Series", status: "Tracking", color: "bg-violet-100 text-violet-700" },
                      { name: "Vertex Realty Q2", status: "Outreach", color: "bg-purple-100 text-purple-700" },
                    ].map((c) => (
                      <div key={c.name} className="px-3 py-2.5 flex items-center justify-between border-b border-slate-50 last:border-0">
                        <span className="text-xs text-slate-700 font-medium">{c.name}</span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${c.color}`}>{c.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl border border-slate-200 shadow-card-hover p-3 flex items-center gap-2.5">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800">Campaign ROI</p>
                  <p className="text-sm font-bold text-emerald-600">+187% avg</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="border-y border-slate-100 py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-7">
            Trusted by brands across the region
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {trustedBrands.map((brand) => (
              <span
                key={brand}
                className="text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors cursor-default"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold text-teal-600 uppercase tracking-widest">How Carvaan Works</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#080f1e]">
              Every stage of a campaign, in one place
            </h2>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto text-base">
              From creator discovery to final performance reporting, Carvaan structures the entire workflow so nothing falls through the cracks.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl p-6 border border-slate-200 shadow-card hover:shadow-card-hover transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-bold text-slate-100 leading-none">{item.step}</span>
                  <div className="w-9 h-9 bg-teal-50 rounded-lg flex items-center justify-center">
                    <item.icon className="w-4.5 h-4.5 text-teal-600" />
                  </div>
                </div>
                <h3 className="font-semibold text-[#0f1e38] text-sm mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold text-teal-600 uppercase tracking-widest">Platform Features</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#080f1e]">
              Everything your team needs
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group p-5 rounded-xl border border-slate-200 hover:border-teal-200 hover:bg-teal-50/30 transition-all duration-200"
              >
                <div className="w-9 h-9 bg-[#eef2f9] rounded-lg flex items-center justify-center mb-4 group-hover:bg-teal-100 transition-colors">
                  <feature.icon className="w-4.5 h-4.5 text-[#1e3d72] group-hover:text-teal-700 transition-colors" />
                </div>
                <h3 className="text-sm font-semibold text-[#0f1e38] mb-1.5">{feature.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics preview */}
      <section className="py-20 bg-[#080f1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold text-teal-400 uppercase tracking-widest">Performance Intelligence</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white leading-tight">
                Understand exactly what your campaigns delivered
              </h2>
              <p className="mt-4 text-slate-400 leading-relaxed">
                Carvaan tracks every metric that matters, reach, engagement, clicks, conversions, cost per acquisition, and ROI, across all creators and platforms in real time.
              </p>
              <ul className="mt-6 space-y-3">
                {["Per-creator performance breakdown", "Platform comparison analytics", "Client-ready PDF reports", "ROI and ROAS tracking", "Coupon and UTM link attribution"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Analytics mockup */}
            <div className="bg-[#0f1e38] rounded-2xl p-5 border border-[#182f58]">
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { label: "Total Reach", value: "2.4M", change: "+18%" },
                  { label: "Engagement", value: "142K", change: "+24%" },
                  { label: "Clicks", value: "68.5K", change: "+31%" },
                  { label: "Campaign ROI", value: "187%", change: "+12%" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-[#182f58] rounded-xl p-4">
                    <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
                    <p className="text-xl font-bold text-white mt-1">{stat.value}</p>
                    <p className="text-xs text-emerald-400 mt-0.5 font-medium">{stat.change}</p>
                  </div>
                ))}
              </div>
              {/* Fake chart bars */}
              <div className="bg-[#182f58] rounded-xl p-4">
                <p className="text-xs text-slate-500 font-medium mb-3">Reach by Creator</p>
                <div className="space-y-2.5">
                  {[
                    { name: "Layla Al Mansouri", pct: 88 },
                    { name: "Fatima Khalid", pct: 72 },
                    { name: "Noor Al Suwaidi", pct: 65 },
                    { name: "Omar Al Rashidi", pct: 48 },
                  ].map((c) => (
                    <div key={c.name}>
                      <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                        <span>{c.name}</span>
                        <span>{c.pct}%</span>
                      </div>
                      <div className="h-1.5 bg-[#1e3d72] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-teal-500 rounded-full"
                          style={{ width: `${c.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-teal-600 uppercase tracking-widest">What Our Users Say</span>
            <h2 className="mt-3 text-3xl font-bold text-[#080f1e]">Trusted by brands, agencies, and creators</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl p-6 border border-slate-200 shadow-card"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#d5e0f1] rounded-full flex items-center justify-center">
                    <span className="text-[#1e3d72] font-semibold text-sm">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                  <span className="ml-auto text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{t.company}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-xs font-semibold text-teal-600 uppercase tracking-widest">Simple Pricing</span>
          <h2 className="mt-3 text-3xl font-bold text-[#080f1e]">Plans for every team size</h2>
          <p className="mt-4 text-slate-500 max-w-md mx-auto">
            Whether you are running one campaign a month or managing a full creator programme, Carvaan has a plan that fits.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link href="/pricing">
              <Button variant="primary" size="lg">
                View Pricing
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#080f1e]">Frequently asked questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#080f1e]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to manage your creator campaigns with clarity?
          </h2>
          <p className="mt-4 text-slate-400 text-lg">
            Join brands and agencies across the GCC who manage creator partnerships on Carvaan.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/signup">
              <Button variant="secondary" size="lg">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                size="lg"
                className="border-[#1e3d72] text-slate-300 hover:bg-[#182f58] hover:text-white"
              >
                Book a Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
