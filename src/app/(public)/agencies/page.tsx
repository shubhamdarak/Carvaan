"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Users, BarChart2, FileText, Layers, MessageSquare, TrendingUp, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Layers, title: "Multi-client dashboard", description: "Manage all your brand clients under one agency account. Each client has its own campaign space, reporting, and creator shortlists." },
  { icon: Users, title: "Full creator database access", description: "Search and filter a database of verified GCC creators by niche, platform, location, engagement, and brand fit. Add to shortlists in one click." },
  { icon: MessageSquare, title: "Outreach pipeline management", description: "Move creators through your outreach pipeline, from first contact to confirmed deal, with a Kanban board and full message history." },
  { icon: FileText, title: "Content approval workflow", description: "Review content, leave revision notes, approve deliverables, and mark posts as live, all with a timestamped approval trail for clients." },
  { icon: BarChart2, title: "Client-ready performance reports", description: "Generate professional campaign reports with one click. Share with clients, export, or present, no manual data compilation required." },
  { icon: TrendingUp, title: "ROI and ROAS tracking", description: "See the real return on every campaign, cost per view, cost per click, cost per lead, and ROAS across all creators and platforms." },
];

const clientFeatures = [
  "Separate brand dashboard for each client",
  "Per-client campaign performance reporting",
  "Role-based access for team members",
  "Creator shortlists per campaign",
  "Outreach pipeline per campaign",
  "Payment tracking per creator",
];

const roles = ["Owner", "Campaign Manager", "Creator Manager", "Content Reviewer", "Analyst"];

export default function AgenciesPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="py-16 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="inline-flex items-center bg-teal-50 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-teal-200 mb-6">
              For Agencies
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#080f1e] leading-tight">
              The operating system for agencies running creator campaigns at scale.
            </h1>
            <p className="mt-5 text-lg text-slate-500 max-w-2xl leading-relaxed">
              Carvaan gives marketing agencies a structured platform to manage multiple brand clients, discover creators, run outreach, approve content, and report results, without the spreadsheets.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/login">
                <Button variant="primary" size="lg">
                  Start as an Agency
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg">
                  View Agency Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#080f1e]">
              Built specifically for agency workflows
            </h2>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto">
              Every feature in Carvaan was designed with agency processes in mind, from multi-client management to team roles and client reporting.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="p-6 rounded-xl border border-slate-200 hover:border-teal-200 hover:bg-teal-50/20 transition-all"
              >
                <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-teal-600" />
                </div>
                <h3 className="font-semibold text-[#0f1e38] text-sm mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Multi-client section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold text-teal-600 uppercase tracking-widest">Multi-Client Management</span>
              <h2 className="mt-3 text-3xl font-bold text-[#080f1e]">
                One agency account, unlimited brand clients
              </h2>
              <p className="mt-4 text-slate-500 leading-relaxed">
                Agencies operating at scale need clear separation between clients. Carvaan gives each brand client its own workspace while keeping all agency management in one dashboard.
              </p>
              <ul className="mt-6 space-y-3">
                {clientFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-card">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Agency Team Roles</p>
              <div className="space-y-3">
                {roles.map((role) => (
                  <div key={role} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-sm font-medium text-slate-700">{role}</span>
                    <span className="text-xs text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full font-medium">Active</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-slate-400">Role-based access control for every team member.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-[#080f1e]">
            Ready to manage your creator campaigns with structure?
          </h2>
          <p className="mt-4 text-slate-500">
            Set up your agency account in minutes and onboard your first brand client.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/signup">
              <Button variant="primary" size="lg">
                Create Agency Account
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg">
                Talk to Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
