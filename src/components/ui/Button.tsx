import * as React from "react";
import { cn } from "@/src/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "nav" | "green" | "gold" | "purple";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-slate-800 text-slate-200 border border-slate-700 hover:border-blue-500 hover:text-blue-500",
      ghost: "bg-transparent text-slate-400 border border-slate-800 hover:border-blue-500 hover:text-blue-500",
      danger: "bg-red-900/10 text-red-500 border border-red-900/20 hover:bg-red-900/20",
      nav: "bg-gradient-to-br from-blue-600 to-blue-700 text-white font-bold shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5",
      green: "bg-emerald-600 text-white hover:bg-emerald-700",
      gold: "bg-amber-500 text-slate-950 hover:bg-amber-600",
      purple: "bg-violet-600 text-white hover:bg-violet-700",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
