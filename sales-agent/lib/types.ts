export type AssetType =
  | "cold_email"
  | "linkedin_dm"
  | "follow_up"
  | "call_script"
  | "breakup_email";

export type ToneType =
  | "Professional"
  | "Conversational"
  | "Confident"
  | "Friendly"
  | "Direct";

export interface ProspectInput {
  prospectName: string;
  company: string;
  offer: string;
  tone: ToneType;
}

export interface ProspectRow {
  id: string;
  user_id: string;
  prospect_name: string;
  company: string;
  offer: string;
  tone: string;
  created_at: string;
}

export interface OutreachSequenceRow {
  id: string;
  prospect_id: string;
  asset_type: AssetType;
  content: string;
  created_at: string;
}

export interface ProspectWithSequences extends ProspectRow {
  outreach_sequences: OutreachSequenceRow[];
}

export type SequenceMap = Partial<Record<AssetType, string>>;

export interface GenerateRequest {
  assetType: AssetType;
  prospectName: string;
  company: string;
  offer: string;
  tone: string;
}

export interface GenerateResponse {
  result: string;
}

export interface GenerateError {
  error: string;
}

export const ASSET_LABELS: Record<AssetType, string> = {
  cold_email: "Cold Email",
  linkedin_dm: "LinkedIn DM",
  follow_up: "Follow-Up Email",
  call_script: "Cold Call Script",
  breakup_email: "Break-Up Email",
};

export const ASSET_ORDER: AssetType[] = [
  "cold_email",
  "linkedin_dm",
  "follow_up",
  "call_script",
  "breakup_email",
];

export const ASSET_COLORS: Record<AssetType, string> = {
  cold_email: "#06B6D4",
  linkedin_dm: "#0A66C2",
  follow_up: "#F59E0B",
  call_script: "#10B981",
  breakup_email: "#EF4444",
};

export const TONES: ToneType[] = [
  "Professional",
  "Conversational",
  "Confident",
  "Friendly",
  "Direct",
];
