import Link from "next/link";
import { Mail } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "For Brands", href: "/brands" },
    { label: "For Agencies", href: "/agencies" },
    { label: "For Creators", href: "/creators" },
    { label: "Pricing", href: "/pricing" },
    { label: "Free Tools", href: "/tools" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Creator Terms", href: "#" },
    { label: "Brand Terms", href: "#" },
  ],
};

export function PublicFooter() {
  return (
    <footer className="bg-[#080f1e] text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <span className="text-white font-bold text-xl tracking-tight">Carvaan</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Creator marketing, managed with clarity. One platform for brands, agencies, and creators across the GCC.
            </p>
            <div className="mt-6">
              <p className="text-xs text-slate-500 mb-2 font-medium uppercase tracking-wider">Newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 bg-[#0f1e38] border border-[#1e3d72] text-slate-200 text-sm rounded-lg px-3 py-2 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
                <button className="bg-teal-600 hover:bg-teal-500 text-white text-sm px-4 py-2 rounded-lg transition-colors">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                {category}
              </p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[#182f58] mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} Carvaan. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Serving brands and creators across the UAE, Saudi Arabia, and the GCC.
          </p>
        </div>
      </div>
    </footer>
  );
}
