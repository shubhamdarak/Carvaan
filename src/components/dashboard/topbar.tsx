"use client";

import { Bell, Search, Menu, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { notifications } from "@/data/notifications";
import { StatusBadge } from "@/components/ui/status-badge";

interface TopbarProps {
  title?: string;
  onMenuClick?: () => void;
}

export function Topbar({ title, onMenuClick }: TopbarProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="h-16 bg-white border-b border-slate-200 flex items-center gap-4 px-4 sm:px-6 flex-shrink-0">
      {/* Mobile menu */}
      {onMenuClick && (
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}

      {/* Title */}
      {title && (
        <h1 className="text-base font-semibold text-slate-900 hidden sm:block">{title}</h1>
      )}

      {/* Search */}
      <div className="flex-1 max-w-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:bg-white transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl border border-slate-200 shadow-xl z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-800">Notifications</p>
                  {unreadCount > 0 && (
                    <span className="text-xs text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full font-medium">{unreadCount} new</span>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.slice(0, 8).map((n) => (
                    <div
                      key={n.id}
                      className={cn(
                        "px-4 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 cursor-pointer transition-colors",
                        !n.read && "bg-teal-50/40"
                      )}
                    >
                      <div className="flex items-start gap-2">
                        {!n.read && <div className="w-2 h-2 bg-teal-500 rounded-full mt-1.5 flex-shrink-0" />}
                        <div className={cn("flex-1", n.read && "pl-4")}>
                          <p className="text-xs font-semibold text-slate-800">{n.title}</p>
                          <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{n.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* User avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 bg-[#d5e0f1] rounded-full flex items-center justify-center">
            <span className="text-[#1e3d72] font-semibold text-sm">A</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-slate-800 leading-tight">Account</p>
            <p className="text-xs text-slate-500 leading-tight">Demo User</p>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
        </div>
      </div>
    </div>
  );
}
