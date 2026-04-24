"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ASSET_LABELS, ASSET_COLORS } from "@/lib/types";
import type { AssetType } from "@/lib/types";

interface SequenceCardProps {
  assetType: AssetType;
  content: string;
  index?: number;
}

export function SequenceCard({ assetType, content, index = 0 }: SequenceCardProps) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const color = ASSET_COLORS[assetType];
  const preview = content.split("\n").slice(0, 2).join("\n");

  async function handleCopy() {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: index * 0.08 }}
      className="border border-surface-border bg-surface-2"
    >
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-white/[0.02] transition-colors"
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="flex items-center gap-3">
          <span
            className="w-2 h-2 flex-shrink-0"
            style={{ backgroundColor: color }}
          />
          <span
            className="text-xs font-mono font-semibold uppercase tracking-widest"
            style={{ color }}
          >
            {ASSET_LABELS[assetType]}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCopy();
            }}
            className={cn(
              "flex items-center gap-1.5 text-xs font-mono px-2 py-1 border transition-all duration-150",
              copied
                ? "text-[#10B981] border-[#10B981]/30 bg-[#10B981]/10"
                : "text-white/40 border-surface-border hover:text-white hover:border-white/20"
            )}
          >
            {copied ? <Check size={11} /> : <Copy size={11} />}
            {copied ? "Copied" : "Copy"}
          </button>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={14} className="text-white/30" />
          </motion.div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {!expanded && (
          <div className="px-4 pb-3">
            <p className="text-xs font-mono text-white/30 whitespace-pre-wrap line-clamp-2">
              {preview}
            </p>
          </div>
        )}
        {expanded && (
          <motion.div
            key="expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div
              className="mx-4 mb-4 p-4 border-l-2"
              style={{ borderColor: color, backgroundColor: `${color}08` }}
            >
              <pre className="text-sm font-mono text-white/80 whitespace-pre-wrap leading-relaxed">
                {content}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
