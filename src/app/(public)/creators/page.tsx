"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { User, Briefcase, CreditCard, BarChart2, Star, ArrowRight, CheckCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const creatorBenefits = [
  { icon: User, title: "Build your professional creator profile", description: "Set up a complete creator profile with your niche, platforms, audience breakdown, and content rates. Brands see exactly who you are." },
  { icon: Briefcase, title: "Access brand collaboration opportunities", description: "Browse available campaign briefs from brands and agencies. Apply to the ones that match your content style and audience." },
  { icon: CreditCard, title: "Track your campaign earnings", description: "See all agreed payments, bonus conditions, invoice status, and payment confirmations in your creator dashboard, full transparency." },
  { icon: BarChart2, title: "View your performance data", description: "After each campaign, see your reach, engagement, click-throughs, and brand fit score, data you can use to grow your creator business." },
];

const workflow = [
  { step: "01", title: "Create your creator profile", detail: "Add your platforms, niche, audience stats, content categories, and pricing." },
  { step: "02", title: "Get matched to relevant campaigns", detail: "Brands and agencies on Carvaan find you through discovery and invite you to campaigns that fit your profile." },
  { step: "03", title: "Review the campaign brief", detail: "Access the full brief, objectives, deliverables, timelines, content guidelines, and compensation." },
  { step: "04", title: "Submit your content for approval", detail: "Upload draft content for brand review. Receive clear revision feedback or direct approval." },
  { step: "05", title: "Post and get paid", detail: "Once content is approved and published, payments are tracked and processed through the platform." },
];

const platforms = ["Instagram", "TikTok", "YouTube", "Snapchat"];

const niches = [
  "Beauty", "Fashion", "Fitness", "Food", "Travel",
  "Technology", "Automotive", "Real Estate", "Lifestyle",
  "Parenting", "Health & Wellness", "Luxury", "Finance",
];

export default function CreatorsPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="py-16 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="inline-flex items-center bg-sky-50 text-sky-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-sky-200 mb-6">
              For Creators
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#080f1e] leading-tight">
              Collaborate with brands that fit. Get paid fairly. Build your creator business.
            </h1>
            <p className="mt-5 text-lg text-slate-500 max-w-2xl leading-relaxed">
              Carvaan connects content creators across the GCC with brands and agencies running structured campaigns. Professional briefs, clear deliverables, transparent payments.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/signup">
                <Button variant="primary" size="lg">
                  Join as a Creator
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              {[
                { label: "Free to join" },
                { label: "GCC-focused brands" },
                { label: "Transparent payments" },
              ].map((item) => (
                <span key={item.label} className="flex items-center gap-1.5 text-sm text-slate-500">
                  <CheckCircle className="w-4 h-4 text-teal-500" />
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Platforms and niches */}
      <section className="border-b border-slate-100 py-10 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Platforms We Work With</p>
              <div className="flex flex-wrap gap-2">
                {platforms.map((p) => (
                  <span key={p} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700">{p}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Creator Niches</p>
              <div className="flex flex-wrap gap-2">
                {niches.map((n) => (
                  <span key={n} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600">{n}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#080f1e]">Why creators choose Carvaan</h2>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto">
              A professional platform built to make brand collaborations clear, structured, and fairly compensated.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {creatorBenefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-5 p-6 rounded-xl border border-slate-200 hover:border-sky-200 hover:bg-sky-50/20 transition-all"
              >
                <div className="w-11 h-11 bg-sky-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <b.icon className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#0f1e38] text-base mb-2">{b.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{b.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works for creators */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#080f1e]">How it works for creators</h2>
          </div>
          <div className="space-y-4">
            {workflow.map((w, i) => (
              <motion.div
                key={w.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-5 items-start bg-white rounded-xl p-5 border border-slate-200"
              >
                <span className="text-2xl font-bold text-slate-200 flex-shrink-0 w-10">{w.step}</span>
                <div>
                  <h3 className="font-semibold text-[#0f1e38] text-sm mb-1">{w.title}</h3>
                  <p className="text-sm text-slate-500">{w.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment security */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-5">
                <Shield className="w-6 h-6 text-emerald-600" />
              </div>
              <h2 className="text-3xl font-bold text-[#080f1e]">Clear, structured, and fair payments</h2>
              <p className="mt-4 text-slate-500 leading-relaxed">
                Every payment on Carvaan goes through a formal approval process. You always know your agreed rate, bonus conditions, expected payment date, and current invoice status.
              </p>
              <ul className="mt-6 space-y-3">
                {["Agreed rate confirmed before campaign starts", "Bonus conditions documented", "Invoice status tracked in your dashboard", "Payment confirmation logged on platform"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-card">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Payment Overview</p>
              {[
                { campaign: "Gleam Radiance Launch", amount: "AED 9,000", status: "Paid", color: "bg-emerald-100 text-emerald-700" },
                { campaign: "ProGear Protein Series", amount: "AED 6,500", status: "Processing", color: "bg-sky-100 text-sky-700" },
                { campaign: "NestHQ Living Series", amount: "AED 9,500", status: "Pending", color: "bg-slate-100 text-slate-600" },
              ].map((p) => (
                <div key={p.campaign} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-slate-800">{p.campaign}</p>
                    <p className="text-sm font-bold text-[#0f1e38]">{p.amount}</p>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${p.color}`}>{p.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-[#080f1e]">Ready to take your creator business further?</h2>
          <p className="mt-4 text-slate-500">Join the Carvaan creator network. It is free to sign up.</p>
          <div className="mt-8">
            <Link href="/signup">
              <Button variant="primary" size="lg">
                Create Creator Profile
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
