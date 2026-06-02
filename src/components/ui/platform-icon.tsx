import { cn } from "@/lib/utils";
import type { Platform } from "@/types";

interface PlatformIconProps {
  platform: Platform;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = { sm: "w-3.5 h-3.5", md: "w-4 h-4", lg: "w-5 h-5" };

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.2 8.2 0 004.78 1.52V6.79a4.85 4.85 0 01-1.01-.1z" />
    </svg>
  );
}

function SnapchatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.166 2c.914 0 3.978.277 5.446 3.164.498.98.37 2.64.266 4.002-.014.19-.028.38-.04.562.26.123.527.193.778.193.369 0 .613-.108.776-.2.076-.043.153-.064.234-.064.201 0 .417.14.417.361 0 .347-.464.666-1.135.8-.08.016-.161.028-.24.034-.113.53-.356 1.193-1.07 1.193a1.37 1.37 0 01-.298-.032c-.55-.114-1.116-.4-1.74-.708-.41-.202-.836-.41-1.234-.547-.113-.038-.223-.063-.33-.063-.34 0-.615.182-.923.52a5.89 5.89 0 01-.95 1.02 1.98 1.98 0 01-1.169.352c-.437 0-.87-.12-1.258-.352a5.938 5.938 0 01-.945-1.019c-.304-.339-.583-.52-.921-.52-.106 0-.218.025-.33.063-.4.138-.823.346-1.232.547-.626.308-1.192.594-1.742.708a1.37 1.37 0 01-.298.032c-.712 0-.956-.662-1.07-1.193a3.12 3.12 0 01-.24-.034C2.03 10.38 1.561 10.06 1.561 9.712c0-.221.216-.36.418-.36.08 0 .157.02.233.063.164.092.407.2.777.2.254 0 .52-.07.778-.193a19.05 19.05 0 01-.041-.562c-.103-1.362-.23-3.022.267-4.002C5.46 2.278 8.525 2 9.44 2h.726z" />
    </svg>
  );
}

const platformConfig: Record<Platform, { icon: React.ComponentType<{ className?: string }>; color: string; bg: string }> = {
  instagram: { icon: InstagramIcon, color: "text-pink-600", bg: "bg-pink-50" },
  tiktok: { icon: TikTokIcon, color: "text-slate-900", bg: "bg-slate-100" },
  youtube: { icon: YoutubeIcon, color: "text-red-600", bg: "bg-red-50" },
  snapchat: { icon: SnapchatIcon, color: "text-yellow-500", bg: "bg-yellow-50" },
};

export function PlatformIcon({ platform, className, size = "md" }: PlatformIconProps) {
  const config = platformConfig[platform];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md",
        config.bg,
        size === "sm" ? "w-5 h-5" : size === "lg" ? "w-8 h-8" : "w-6 h-6",
        className
      )}
    >
      <Icon className={cn(sizeMap[size], config.color)} />
    </span>
  );
}

export function PlatformBadges({ platforms }: { platforms: Platform[] }) {
  return (
    <div className="flex items-center gap-1">
      {platforms.map((p) => (
        <PlatformIcon key={p} platform={p} size="sm" />
      ))}
    </div>
  );
}
