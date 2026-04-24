"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={id}
            className="text-xs font-mono text-white/50 uppercase tracking-widest"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full bg-surface-2 border border-surface-border text-white placeholder:text-white/25 font-mono text-sm px-3 py-2.5 transition-all duration-150",
            "focus:outline-none focus:border-brand/60 focus:shadow-[0_0_0_2px_rgba(6,182,212,0.2)]",
            error && "border-red-500/60 focus:border-red-500/60",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs font-mono text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={id}
            className="text-xs font-mono text-white/50 uppercase tracking-widest"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={cn(
            "w-full bg-surface-2 border border-surface-border text-white placeholder:text-white/25 font-mono text-sm px-3 py-2.5 resize-none transition-all duration-150",
            "focus:outline-none focus:border-brand/60 focus:shadow-[0_0_0_2px_rgba(6,182,212,0.2)]",
            error && "border-red-500/60",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs font-mono text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Input, Textarea };
