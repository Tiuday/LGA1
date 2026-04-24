import { createClient } from "@/lib/supabase/server";
import { ProspectsList } from "@/components/ProspectsList";
import { EmptyState } from "@/components/EmptyState";
import type { ProspectWithSequences } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function ProspectsPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("prospects")
    .select("*, outreach_sequences(*)")
    .order("created_at", { ascending: false });

  const prospects = (data as ProspectWithSequences[]) ?? [];

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl text-white">
          Saved Prospects
        </h1>
        <p className="text-sm font-mono text-white/40 mt-1">
          {prospects.length} prospect{prospects.length !== 1 ? "s" : ""} saved
        </p>
      </div>

      {prospects.length === 0 ? (
        <EmptyState
          message="No prospects saved yet."
          cta="Run your first sequence"
          href="/dashboard"
        />
      ) : (
        <ProspectsList prospects={prospects} />
      )}
    </div>
  );
}
