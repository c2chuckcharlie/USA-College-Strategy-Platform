import * as React from "react";
import { cn } from "@/src/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border border-blue-500/20 bg-white/5 p-5 backdrop-blur-md",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export { Card, CardTitle };
