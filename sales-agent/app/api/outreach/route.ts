import { NextResponse } from "next/server";
import { openrouter, OUTREACH_PROMPTS, OPENROUTER_MODEL } from "@/lib/anthropic";
import type { AssetType, GenerateRequest } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body: GenerateRequest = await request.json();
    const { assetType, prospectName, company, offer, tone } = body;

    if (!assetType || !prospectName || !company || !offer || !tone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const validAssetTypes: AssetType[] = [
      "cold_email",
      "linkedin_dm",
      "follow_up",
      "call_script",
      "breakup_email",
    ];

    if (!validAssetTypes.includes(assetType as AssetType)) {
      return NextResponse.json({ error: "Invalid asset type" }, { status: 400 });
    }

    const promptFn = OUTREACH_PROMPTS[assetType as AssetType];
    const prompt = promptFn({ prospectName, company, offer, tone: tone as never });

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    try {
      const completion = await openrouter.chat.completions.create({
        model: OPENROUTER_MODEL,
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
      });

      clearTimeout(timeout);

      const result = completion.choices[0]?.message?.content ?? "";
      return NextResponse.json({ result });
    } catch (err) {
      clearTimeout(timeout);
      throw err;
    }
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Failed to generate content. Please try again." },
      { status: 500 }
    );
  }
}
