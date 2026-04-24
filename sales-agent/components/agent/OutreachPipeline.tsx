"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ASSET_ORDER, ASSET_LABELS, ASSET_COLORS } from "@/lib/types";
import type { AssetType } from "@/lib/types";

interface OutreachPipelineProps {
  activeIndex: number;
  completedAssets: AssetType[];
}

export function OutreachPipeline({
  activeIndex,
  completedAssets,
}: OutreachPipelineProps) {
  return (
    <div className="py-8">
      <p className="text-xs font-mono text-white/40 uppercase tracking-widest mb-6 text-center">
        Generating Sequence
      </p>
      <div className="flex items-center justify-center">
        {ASSET_ORDER.map((type, index) => {
          const color = ASSET_COLORS[type];
          const isCompleted = completedAssets.includes(type);
          const isActive = index === activeIndex && !isCompleted;
          const isPast = index < activeIndex;

          return (
            <div key={type} className="flex items-center">
              <div className="flex flex-col items-center gap-2">
                <motion.div
                  className="relative flex items-center justify-center w-12 h-12 border-2"
                  animate={
                    isActive
                      ? {
                          scale: [1, 1.08, 1],
                          boxShadow: [
                            `0 0 0px ${color}00`,
                            `0 0 20px ${color}66`,
                            `0 0 0px ${color}00`,
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    borderColor: isCompleted || isActive ? color : "#1a1a1a",
                    backgroundColor:
                      isCompleted
                        ? color
                        : isActive
                        ? `${color}15`
                        : "transparent",
                  }}
                >
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Check size={16} color="#ffffff" strokeWidth={3} />
                    </motion.div>
                  ) : (
                    <span
                      className="text-xs font-mono font-bold"
                      style={{ color: isActive ? color : "#ffffff20" }}
                    >
                      {index + 1}
                    </span>
                  )}
                </motion.div>
                <span
                  className="text-[10px] font-mono text-center max-w-[70px] leading-tight"
                  style={{
                    color:
                      isCompleted || isActive ? color : "rgba(255,255,255,0.25)",
                  }}
                >
                  {ASSET_LABELS[type]}
                </span>
              </div>

              {index < ASSET_ORDER.length - 1 && (
                <div className="relative w-8 h-px mb-6 mx-1 bg-surface-border overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 h-full"
                    initial={{ width: "0%" }}
                    animate={{
                      width: isPast || isCompleted ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{ backgroundColor: color }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
