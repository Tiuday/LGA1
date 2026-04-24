"use client";

import { SequenceCard } from "./SequenceCard";
import { Button } from "@/components/ui/Button";
import { buildAllAssetsText } from "@/lib/utils";
import { ASSET_ORDER } from "@/lib/types";
import type { SequenceMap } from "@/lib/types";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface SequenceGridProps {
  sequences: SequenceMap;
  onSave: () => void;
  onReset: () => void;
  saving: boolean;
  saved: boolean;
}

export function SequenceGrid({
  sequences,
  onSave,
  onReset,
  saving,
  saved,
}: SequenceGridProps) {
  const [copiedAll, setCopiedAll] = useState<boolean>(false);

  async function handleCopyAll() {
    const allText = buildAllAssetsText(
      ASSET_ORDER.filter((t) => sequences[t]).map((t) => ({
        asset_type: t,
        content: sequences[t] ?? "",
      }))
    );
    await navigator.clipboard.writeText(allText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-mono text-white/40 uppercase tracking-widest">
          Generated Sequence
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyAll}
          >
            {copiedAll ? <Check size={11} /> : <Copy size={11} />}
            {copiedAll ? "Copied All" : "Copy All"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onSave}
            disabled={saving || saved}
          >
            {saving ? "Saving..." : saved ? "Saved" : "Save to Prospects"}
          </Button>
          <Button variant="ghost" size="sm" onClick={onReset}>
            New Sequence
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {ASSET_ORDER.filter((t) => sequences[t]).map((type, index) => (
          <SequenceCard
            key={type}
            assetType={type}
            content={sequences[type] ?? ""}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
