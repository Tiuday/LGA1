"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
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

export default function DashboardPage() {
  const [stage, setStage] = useState<Stage>("input");
  const [values, setValues] = useState<ProspectInput>(DEFAULT_VALUES);
  const [sequences, setSequences] = useState<SequenceMap>({});
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [completedAssets, setCompletedAssets] = useState<AssetType[]>([]);
  const [saving, setSaving] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

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

  async function handleSave() {
    setSaving(true);
    const supabase = createClient();

    const { data: prospect, error: prospectError } = await supabase
      .from("prospects")
      .insert({
        prospect_name: values.prospectName,
        company: values.company,
        offer: values.offer,
        tone: values.tone,
      })
      .select()
      .single();

    if (prospectError || !prospect) {
      setSaving(false);
      return;
    }

    const inserts = ASSET_ORDER.filter((t) => sequences[t]).map((t) => ({
      prospect_id: prospect.id,
      asset_type: t,
      content: sequences[t] ?? "",
    }));

    await supabase.from("outreach_sequences").insert(inserts);
    setSaving(false);
    setSaved(true);
  }

  function handleReset() {
    setStage("input");
    setValues(DEFAULT_VALUES);
    setSequences({});
    setCompletedAssets([]);
    setActiveIndex(0);
    setSaved(false);
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl text-white">
          Generate Sequence
        </h1>
        <p className="text-sm font-mono text-white/40 mt-1">
          Enter a prospect and get 5 outreach assets instantly.
        </p>
      </div>

      <div className="border border-surface-border bg-surface-2 p-6">
        {stage === "input" && (
          <ProspectForm
            values={values}
            onChange={setValues}
            onSubmit={handleGenerate}
            loading={false}
          />
        )}

        {stage === "running" && (
          <>
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
          </>
        )}

        {stage === "results" && (
          <SequenceGrid
            sequences={sequences}
            onSave={handleSave}
            onReset={handleReset}
            saving={saving}
            saved={saved}
          />
        )}
      </div>
    </div>
  );
}
