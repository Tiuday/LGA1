"use client";

import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { TONES, ASSET_LABELS, ASSET_ORDER, ASSET_COLORS } from "@/lib/types";
import type { ProspectInput, ToneType } from "@/lib/types";

interface ProspectFormProps {
  values: ProspectInput;
  onChange: (values: ProspectInput) => void;
  onSubmit: () => void;
  loading: boolean;
  disabled?: boolean;
}

export function ProspectForm({
  values,
  onChange,
  onSubmit,
  loading,
  disabled,
}: ProspectFormProps) {
  const isFormValid =
    values.prospectName.trim() &&
    values.company.trim() &&
    values.offer.trim();

  function loadSample() {
    onChange({
      prospectName: "Sarah Chen",
      company: "Acme SaaS",
      offer: "AI-powered sales automation that cuts outreach time by 70%",
      tone: "Conversational",
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-mono text-white/40 uppercase tracking-widest">
          Prospect Details
        </h2>
        <Button variant="ghost" size="sm" onClick={loadSample} disabled={disabled}>
          Load Sample
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          id="prospectName"
          label="Prospect Name"
          placeholder="Sarah Chen"
          value={values.prospectName}
          onChange={(e) =>
            onChange({ ...values, prospectName: e.target.value })
          }
          disabled={disabled}
        />
        <Input
          id="company"
          label="Company"
          placeholder="Acme SaaS"
          value={values.company}
          onChange={(e) => onChange({ ...values, company: e.target.value })}
          disabled={disabled}
        />
      </div>

      <Textarea
        id="offer"
        label="Your Offer"
        placeholder="Describe your product or service and the core value it delivers..."
        value={values.offer}
        onChange={(e) => onChange({ ...values, offer: e.target.value })}
        rows={3}
        disabled={disabled}
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-mono text-white/50 uppercase tracking-widest">
          Tone
        </label>
        <div className="flex gap-2 flex-wrap">
          {TONES.map((t) => (
            <button
              key={t}
              onClick={() => onChange({ ...values, tone: t as ToneType })}
              disabled={disabled}
              className={`px-3 py-1.5 text-xs font-mono border transition-all duration-150 ${
                values.tone === t
                  ? "bg-brand text-surface-1 border-brand"
                  : "bg-transparent text-white/50 border-surface-border hover:border-white/20 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <Button
        variant="primary"
        size="lg"
        className="w-full"
        onClick={onSubmit}
        disabled={!isFormValid || loading || disabled}
      >
        {loading ? "Generating..." : "Generate Full Sequence"}
      </Button>

      <div className="flex flex-wrap gap-2">
        {ASSET_ORDER.map((type) => (
          <Badge key={type} color={ASSET_COLORS[type]}>
            {ASSET_LABELS[type]}
          </Badge>
        ))}
      </div>
    </div>
  );
}
