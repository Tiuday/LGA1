"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { SequenceCard } from "@/components/agent/SequenceCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ASSET_ORDER, ASSET_COLORS, ASSET_LABELS } from "@/lib/types";
import { formatDate, buildAllAssetsText } from "@/lib/utils";
import type { ProspectWithSequences, AssetType } from "@/lib/types";
import { Copy, Check, Trash2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default function SingleProspectPage() {
  const params = useParams();
  const router = useRouter();
  const supabase = createClient();
  const [prospect, setProspect] = useState<ProspectWithSequences | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("prospects")
        .select("*, outreach_sequences(*)")
        .eq("id", params.id as string)
        .single();
      setProspect(data as ProspectWithSequences);
      setLoading(false);
    }
    load();
  }, [params.id]);

  async function handleCopyAll() {
    if (!prospect) return;
    const allText = buildAllAssetsText(prospect.outreach_sequences);
    await navigator.clipboard.writeText(allText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  }

  async function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setDeleting(true);
    await supabase.from("prospects").delete().eq("id", prospect!.id);
    router.push("/prospects");
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-10">
        <p className="text-sm font-mono text-white/30">Loading...</p>
      </div>
    );
  }

  if (!prospect) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-10">
        <p className="text-sm font-mono text-red-400">Prospect not found.</p>
      </div>
    );
  }

  const orderedSequences = ASSET_ORDER.map((type) => ({
    type,
    seq: prospect.outreach_sequences.find((s) => s.asset_type === type),
  })).filter((item) => item.seq);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">
            {prospect.prospect_name}
          </h1>
          <p className="text-sm font-mono text-white/40 mt-1">
            {prospect.company} &mdash; {formatDate(prospect.created_at)}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            <Badge>{prospect.tone}</Badge>
            {orderedSequences.map(({ type }) => (
              <Badge key={type} color={ASSET_COLORS[type as AssetType]}>
                {ASSET_LABELS[type as AssetType]}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-2 shrink-0">
          <Button variant="ghost" size="sm" onClick={handleCopyAll}>
            {copiedAll ? <Check size={11} /> : <Copy size={11} />}
            {copiedAll ? "Copied" : "Copy All"}
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={handleDelete}
            disabled={deleting}
          >
            <Trash2 size={11} />
            {confirmDelete ? "Confirm Delete" : "Delete"}
          </Button>
        </div>
      </div>

      <div className="mb-6 p-4 border border-surface-border bg-surface-2">
        <p className="text-xs font-mono text-white/40 uppercase tracking-widest mb-2">
          Offer
        </p>
        <p className="text-sm font-mono text-white/70">{prospect.offer}</p>
      </div>

      <div className="flex flex-col gap-3">
        {orderedSequences.map(({ type, seq }, index) => (
          <SequenceCard
            key={type}
            assetType={type as AssetType}
            content={seq!.content}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
