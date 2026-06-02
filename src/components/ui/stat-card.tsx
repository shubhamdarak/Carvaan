import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  className?: string;
  accent?: "navy" | "teal" | "sky" | "emerald" | "amber";
}

const accentColors = {
  navy: "bg-[#eef2f9] text-[#1e3d72]",
  teal: "bg-teal-50 text-teal-700",
  sky: "bg-sky-50 text-sky-700",
  emerald: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-50 text-amber-700",
};

export function StatCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  className,
  accent = "navy",
}: StatCardProps) {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-slate-200 shadow-card p-5",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-500 truncate">{title}</p>
          <p className="mt-1.5 text-2xl font-bold text-slate-900 tracking-tight">
            {value}
          </p>
          {change !== undefined && (
            <div className="mt-2 flex items-center gap-1">
              {isPositive && (
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              )}
              {isNegative && (
                <TrendingDown className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
              )}
              {!isPositive && !isNegative && (
                <Minus className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              )}
              <span
                className={cn(
                  "text-xs font-medium",
                  isPositive && "text-emerald-600",
                  isNegative && "text-red-500",
                  !isPositive && !isNegative && "text-slate-400"
                )}
              >
                {isPositive ? "+" : ""}
                {change}%
              </span>
              {changeLabel && (
                <span className="text-xs text-slate-400">{changeLabel}</span>
              )}
            </div>
          )}
        </div>
        {icon && (
          <div
            className={cn(
              "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center",
              accentColors[accent]
            )}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
