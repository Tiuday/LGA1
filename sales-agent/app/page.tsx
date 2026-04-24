"use client";

import { useState } from "react";
import { ProspectForm } from "@/components/agent/ProspectForm";
import { OutreachPipeline } from "@/components/agent/OutreachPipeline";
import { SequenceGrid } from "@/components/agent/SequenceGrid";
import {
  ASSET_ORDER,
  type AssetType,
  type ProspectInput,
  type SequenceMap,
  type ToneType,
} from "@/lib/types";

type Stage = "input" | "running" | "results";

const DEFAULT_VALUES: ProspectInput = {
  prospectName: "",
  company: "",
  offer: "",
  tone: "Professional" as ToneType,
};

export default function AgentPage() {
  const [stage, setStage] = useState<Stage>("input");
  const [values, setValues] = useState<ProspectInput>(DEFAULT_VALUES);
  const [sequences, setSequences] = useState<SequenceMap>({});
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [completedAssets, setCompletedAssets] = useState<AssetType[]>([]);

  async function handleGenerate() {
    setStage("running");
    setSequences({});
    setCompletedAssets([]);
    setActiveIndex(0);

    const results: SequenceMap = {};

    for (let i = 0; i < ASSET_ORDER.length; i++) {
      setActiveIndex(i);
      const assetType = ASSET_ORDER[i];

      const res = await fetch("/api/outreach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assetType, ...values }),
      });

      const data = await res.json();
      results[assetType] = res.ok ? data.result : `Error: ${data.error}`;

      setSequences({ ...results });
      setCompletedAssets((prev) => [...prev, assetType]);
    }

    setStage("results");
  }

  function handleReset() {
    setStage("input");
    setValues(DEFAULT_VALUES);
    setSequences({});
    setCompletedAssets([]);
    setActiveIndex(0);
  }

  return (
    <div className="min-h-screen bg-surface-1">
      {/* Header */}
      <header className="border-b border-surface-border px-6 py-4 flex items-center justify-between">
        <span className="font-display font-bold text-lg text-white">
          Sales<span className="text-brand">.</span>Agent
        </span>
        <span className="text-xs font-mono text-white/25 hidden sm:block">
          5 outreach assets — one prospect — seconds
        </span>
      </header>

      {/* Agent */}
      <main className="max-w-3xl mx-auto px-6 py-10">
        {stage === "input" && (
          <>
            <div className="mb-8">
              <h1 className="font-display font-bold text-3xl text-white">
                Generate Your Outreach Sequence
              </h1>
              <p className="text-sm font-mono text-white/40 mt-2">
                Enter a prospect below and get a cold email, LinkedIn DM,
                follow-up, call script, and break-up email — instantly.
              </p>
            </div>
            <div className="border border-surface-border bg-surface-2 p-6">
              <ProspectForm
                values={values}
                onChange={setValues}
                onSubmit={handleGenerate}
                loading={false}
              />
            </div>
          </>
        )}

        {stage === "running" && (
          <>
            <div className="mb-8">
              <h1 className="font-display font-bold text-3xl text-white">
                Generating Sequence
              </h1>
              <p className="text-sm font-mono text-white/40 mt-2">
                Writing 5 assets for{" "}
                <span className="text-white">{values.prospectName}</span> at{" "}
                <span className="text-white">{values.company}</span>
              </p>
            </div>
            <div className="border border-surface-border bg-surface-2 p-6">
              <ProspectForm
                values={values}
                onChange={setValues}
                onSubmit={handleGenerate}
                loading={true}
                disabled={true}
              />
              <div className="mt-6 border-t border-surface-border pt-6">
                <OutreachPipeline
                  activeIndex={activeIndex}
                  completedAssets={completedAssets}
                />
              </div>
            </div>
          </>
        )}

        {stage === "results" && (
          <>
            <div className="mb-8">
              <h1 className="font-display font-bold text-3xl text-white">
                Your Sequence is Ready
              </h1>
              <p className="text-sm font-mono text-white/40 mt-2">
                5 assets for{" "}
                <span className="text-white">{values.prospectName}</span> at{" "}
                <span className="text-white">{values.company}</span>
              </p>
            </div>
            <div className="border border-surface-border bg-surface-2 p-6">
              <SequenceGrid sequences={sequences} onReset={handleReset} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
