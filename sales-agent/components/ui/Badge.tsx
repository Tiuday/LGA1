import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export function Badge({ children, color, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-xs font-mono border",
        className
      )}
      style={
        color
          ? {
              color,
              borderColor: `${color}40`,
              backgroundColor: `${color}10`,
            }
          : {
              color: "#06B6D4",
              borderColor: "rgba(6,182,212,0.25)",
              backgroundColor: "rgba(6,182,212,0.08)",
            }
      }
    >
      {children}
    </span>
  );
}
