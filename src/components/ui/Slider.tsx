import * as React from "react";
import { cn } from "@/src/lib/utils";

export interface SliderProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  valueDisplay?: string | number;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, label, valueDisplay, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <div className="flex justify-between items-center">
            <label className="text-xs font-medium text-slate-400">{label}</label>
            {valueDisplay !== undefined && (
              <span className="text-xs font-bold text-blue-500">{valueDisplay}</span>
            )}
          </div>
        )}
        <input
          type="range"
          className={cn(
            "h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-blue-500",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Slider.displayName = "Slider";

export { Slider };
