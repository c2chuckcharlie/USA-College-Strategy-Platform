import * as React from "react";
import { cn } from "@/src/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "reach" | "match" | "safety" | "aacsb" | "stem" | "research" | "r1" | "default";
  children?: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ className, variant = "default", children, ...props }) => {
  const variants = {
    default: "bg-slate-800 text-slate-400 border-slate-700",
    reach: "bg-red-500/10 text-red-500 border-red-500/20",
    match: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    safety: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    aacsb: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    stem: "bg-teal-500/10 text-teal-500 border-teal-500/20",
    research: "bg-violet-500/10 text-violet-500 border-violet-500/20",
    r1: "bg-pink-500/10 text-pink-500 border-pink-500/20",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
};

export { Badge };
