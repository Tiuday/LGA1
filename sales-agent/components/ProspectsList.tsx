"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ASSET_ORDER, ASSET_LABELS, ASSET_COLORS } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import type { ProspectWithSequences } from "@/lib/types";

interface ProspectsListProps {
  prospects: ProspectWithSequences[];
}

export function ProspectsList({ prospects }: ProspectsListProps) {
  return (
    <div className="flex flex-col divide-y divide-surface-border border border-surface-border">
      {prospects.map((prospect) => {
        const assetTypes = prospect.outreach_sequences.map((s) => s.asset_type);
        return (
          <div
            key={prospect.id}
            className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-sm font-mono text-white font-medium truncate">
                {prospect.prospect_name}
              </span>
              <span className="text-xs font-mono text-white/40 truncate">
                {prospect.company}
              </span>
            </div>

            <div className="flex items-center gap-3 ml-4 shrink-0">
              <div className="hidden md:flex gap-1.5 flex-wrap">
                {ASSET_ORDER.filter((t) => assetTypes.includes(t)).map((t) => (
                  <Badge key={t} color={ASSET_COLORS[t]}>
                    {ASSET_LABELS[t]}
                  </Badge>
                ))}
              </div>
              <span className="text-xs font-mono text-white/25 hidden lg:block">
                {formatDate(prospect.created_at)}
              </span>
              <Link
                href={`/prospects/${prospect.id}`}
                className="text-xs font-mono text-brand border border-brand/30 px-3 py-1 hover:bg-brand/10 transition-colors"
              >
                View
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
