"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: { monthly: 49, annual: 39 },
    description: "For brands and solo marketers running occasional campaigns.",
    features: [
      { text: "Up to 3 active campaigns", included: true },
      { text: "Creator discovery, 50 searches/month", included: true },
      { text: "Creator shortlisting", included: true },
      { text: "Campaign briefs", included: true },
      { text: "Content approval workflow", included: true },
      { text: "Basic performance dashboard", included: true },
      { text: "1 team seat", included: true },
      { text: "Outreach pipeline", included: false },
      { text: "Client reporting", included: false },
      { text: "Custom brand fit scoring", included: false },
      { text: "Dedicated account manager", included: false },
    ],
    cta: "Start Free Trial",
    highlight: false,
    badge: null,
  },
  {
    name: "Growth",
    price: { monthly: 149, annual: 119 },
    description: "For growing brands and small agencies managing multiple campaigns.",
    features: [
      { text: "Up to 10 active campaigns", included: true },
      { text: "Creator discovery, unlimited searches", included: true },
      { text: "Creator shortlisting", included: true },
      { text: "Campaign briefs", included: true },
      { text: "Content approval workflow", included: true },
      { text: "Advanced analytics dashboard", included: true },
      { text: "3 team seats", included: true },
      { text: "Outreach pipeline", included: true },
      { text: "Client reporting (3 clients)", included: true },
      { text: "Custom brand fit scoring", included: false },
      { text: "Dedicated account manager", included: false },
    ],
    cta: "Start Free Trial",
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Business",
    price: { monthly: 399, annual: 319 },
    description: "For agencies and brands running creator programmes at scale.",
    features: [
      { text: "Unlimited active campaigns", included: true },
      { text: "Creator discovery, unlimited searches", included: true },
      { text: "Creator shortlisting", included: true },
      { text: "Campaign briefs + brief generator", included: true },
      { text: "Content approval workflow", included: true },
      { text: "Full analytics and ROI tracking", included: true },
      { text: "Unlimited team seats", included: true },
      { text: "Outreach pipeline + templates", included: true },
      { text: "Client reporting, unlimited clients", included: true },
      { text: "Custom brand fit scoring", included: true },
      { text: "Dedicated account manager", included: false },
    ],
    cta: "Start Free Trial",
    highlight: false,
    badge: null,
  },
  {
    name: "Enterprise",
    price: { monthly: null, annual: null },
    description: "For large agencies and brands with custom requirements and dedicated support.",
    features: [
      { text: "Everything in Business, plus", included: true },
      { text: "Custom onboarding and training", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "Custom creator database access", included: true },
      { text: "API access (future roadmap)", included: true },
      { text: "SLA and priority support", included: true },
      { text: "Custom contracts and billing", included: true },
      { text: "White-label reporting", included: true },
      { text: "Custom integrations", included: true },
      { text: "Compliance review support", included: true },
    ],
    cta: "Contact Sales",
    highlight: false,
    badge: null,
  },
];

const comparisons = [
  { feature: "Active campaigns", starter: "3", growth: "10", business: "Unlimited", enterprise: "Unlimited" },
  { feature: "Creator discovery searches", starter: "50/month", growth: "Unlimited", business: "Unlimited", enterprise: "Unlimited" },
  { feature: "Team seats", starter: "1", growth: "3", business: "Unlimited", enterprise: "Unlimited" },
  { feature: "Client reporting", starter: "", growth: "3 clients", business: "Unlimited", enterprise: "Unlimited" },
  { feature: "Outreach pipeline", starter: "", growth: "Yes", business: "Yes", enterprise: "Yes" },
  { feature: "Campaign analytics", starter: "Basic", growth: "Advanced", business: "Full", enterprise: "Custom" },
  { feature: "Creator payments tracking", starter: "Yes", growth: "Yes", business: "Yes", enterprise: "Yes" },
  { feature: "Support", starter: "Email", growth: "Priority email", business: "Chat + email", enterprise: "Dedicated manager" },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="py-16 bg-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl font-bold text-[#080f1e]">Simple, transparent pricing</h1>
          <p className="mt-4 text-lg text-slate-500">
            Plans for every team size, from solo marketers to full-scale agencies.
          </p>
          {/* Billing toggle */}
          <div className="mt-8 inline-flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-1">
            <button
              onClick={() => setAnnual(false)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                !annual ? "bg-[#0f1e38] text-white" : "text-slate-600 hover:text-slate-900"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                annual ? "bg-[#0f1e38] text-white" : "text-slate-600 hover:text-slate-900"
              )}
            >
              Annual
              <span className={cn("text-xs px-1.5 py-0.5 rounded-full font-semibold", annual ? "bg-teal-500 text-white" : "bg-teal-100 text-teal-700")}>
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  "relative rounded-2xl border p-6 flex flex-col",
                  plan.highlight
                    ? "border-teal-500 shadow-lg shadow-teal-100 ring-1 ring-teal-400"
                    : "border-slate-200"
                )}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-teal-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {plan.badge}
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-[#0f1e38]">{plan.name}</h2>
                  <p className="text-sm text-slate-500 mt-1.5 min-h-[40px]">{plan.description}</p>
                  <div className="mt-4">
                    {plan.price.monthly ? (
                      <div className="flex items-end gap-1">
                        <span className="text-3xl font-bold text-[#080f1e]">
                          ${annual ? plan.price.annual : plan.price.monthly}
                        </span>
                        <span className="text-slate-500 text-sm mb-1">/month</span>
                      </div>
                    ) : (
                      <div className="text-3xl font-bold text-[#080f1e]">Custom</div>
                    )}
                    {annual && plan.price.monthly && (
                      <p className="text-xs text-teal-600 mt-1">Billed annually</p>
                    )}
                  </div>
                </div>
                <Link href={plan.cta === "Contact Sales" ? "#" : "/login"} className="block mb-6">
                  <Button
                    variant={plan.highlight ? "secondary" : "outline"}
                    size="md"
                    className="w-full"
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <ul className="space-y-2.5 flex-1">
                  {plan.features.map((f) => (
                    <li key={f.text} className={cn("flex items-start gap-2.5 text-xs", !f.included && "opacity-40")}>
                      {f.included ? (
                        <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                      )}
                      <span className="text-slate-600">{f.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-[#080f1e] mb-8 text-center">Plan comparison</h2>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-card">
            <div className="grid grid-cols-5 bg-slate-50 border-b border-slate-200 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <div className="py-3 px-4 text-left">Feature</div>
              {["Starter", "Growth", "Business", "Enterprise"].map((p) => (
                <div key={p} className="py-3 px-2">{p}</div>
              ))}
            </div>
            {comparisons.map((row, i) => (
              <div key={row.feature} className={cn("grid grid-cols-5 border-b border-slate-100 last:border-0", i % 2 === 0 ? "bg-white" : "bg-slate-50/50")}>
                <div className="py-3.5 px-4 text-sm text-slate-700 font-medium">{row.feature}</div>
                {[row.starter, row.growth, row.business, row.enterprise].map((val, j) => (
                  <div key={j} className="py-3.5 px-2 text-center text-sm text-slate-600">{val}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ pricing */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-[#080f1e] mb-4">Questions about pricing?</h2>
          <p className="text-slate-500 mb-6">All plans come with a 14-day free trial. No credit card required to start.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/login">
              <Button variant="primary" size="lg">Start Free Trial</Button>
            </Link>
            <Button variant="outline" size="lg">Contact Sales</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
