import { NextResponse } from "next/server";
import { openrouter, OUTREACH_PROMPTS, FREE_MODEL_CHAIN } from "@/lib/anthropic";
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

    let lastError = "";

    for (const model of FREE_MODEL_CHAIN) {
      try {
        const completion = await openrouter.chat.completions.create({
          model,
          max_tokens: 1024,
          messages: [{ role: "user", content: prompt }],
        });

        const result = completion.choices[0]?.message?.content ?? "";
        console.log(`Generated with model: ${model}`);
        return NextResponse.json({ result });
      } catch (err) {
        lastError = err instanceof Error ? err.message : String(err);
        console.warn(`Model ${model} failed: ${lastError} — trying next`);
      }
    }

    return NextResponse.json(
      { error: `All models failed. Last error: ${lastError}` },
      { status: 500 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("API route error:", message);
    return NextResponse.json(
      { error: `Failed to generate content: ${message}` },
      { status: 500 }
    );
  }
}
