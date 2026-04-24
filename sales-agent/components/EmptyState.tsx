import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface EmptyStateProps {
  message?: string;
  cta?: string;
  href?: string;
}

export function EmptyState({
  message = "Nothing here yet.",
  cta,
  href,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
      <div className="w-12 h-12 border border-surface-border flex items-center justify-center">
        <span className="text-2xl text-white/10">0</span>
      </div>
      <p className="text-sm font-mono text-white/30">{message}</p>
      {cta && href && (
        <Link href={href}>
          <Button variant="outline" size="sm">
            {cta}
          </Button>
        </Link>
      )}
    </div>
  );
}
