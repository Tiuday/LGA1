"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-mono font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:opacity-40 disabled:cursor-not-allowed",
          // sizes
          size === "sm" && "text-xs px-3 py-1.5 gap-1.5",
          size === "md" && "text-sm px-4 py-2 gap-2",
          size === "lg" && "text-base px-6 py-3 gap-2",
          // variants
          variant === "primary" &&
            "bg-brand text-surface-1 hover:bg-brand-light active:scale-[0.98]",
          variant === "ghost" &&
            "bg-transparent text-white/60 border border-surface-border hover:text-white hover:border-white/20",
          variant === "danger" &&
            "bg-transparent text-red-400 border border-red-900 hover:bg-red-900/20",
          variant === "outline" &&
            "bg-transparent text-brand border border-brand/40 hover:border-brand hover:bg-brand/10",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
