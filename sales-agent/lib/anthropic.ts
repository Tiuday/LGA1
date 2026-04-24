import OpenAI from "openai";
import type { AssetType, ProspectInput } from "./types";

export const openrouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "X-Title": "AI Sales & Outreach Agent",
  },
});

// Primary free model. Fallback: google/gemma-4-26b-a4b-it:free
export const OPENROUTER_MODEL = "google/gemma-4-31b-it:free";

export const OUTREACH_PROMPTS: Record<
  AssetType,
  (p: ProspectInput) => string
> = {
  cold_email: ({ prospectName, company, offer, tone }) => `
You are an elite B2B sales copywriter. Write a cold email to ${prospectName} at ${company}.
Offer/Value prop: ${offer}
Tone: ${tone}
Rules:
- Subject line that earns an open (no clickbait, no fake 'Re:')
- Personalized opener that references something real about their role or company
- 2-3 short paragraphs, never more
- Clear value prop in one sentence
- Soft CTA (ask for 15 mins, not a sale)
- PS line that adds social proof or urgency
- Total body: under 150 words
Output format — SUBJECT: then BODY: then PS: — nothing else.`,

  linkedin_dm: ({ prospectName, company, offer, tone }) => `
You are a LinkedIn outreach expert with a 40%+ reply rate.
Write a LinkedIn DM to ${prospectName} at ${company}.
Offer/Value prop: ${offer}
Tone: ${tone}
Rules:
- Never start with 'I hope this message finds you well'
- Lead with a genuine observation about them, their company, or their industry
- Maximum 5 sentences total
- End with a soft, low-commitment ask
- No emojis unless tone is Friendly
Output ONLY the DM text, nothing else.`,

  follow_up: ({ prospectName, company, offer, tone }) => `
You are a B2B sales expert. Write a follow-up email to ${prospectName} at ${company}
who has not replied to a cold email about: ${offer}
Tone: ${tone}
Rules:
- Reference the previous email without being needy or aggressive
- Add a new angle, insight, or data point — not just 'bumping this up'
- Under 80 words in the body
- End with exactly one direct question
Output format — SUBJECT: then BODY: — nothing else.`,

  call_script: ({ prospectName, company, offer, tone }) => `
You are a senior sales trainer. Write a cold call script for reaching ${prospectName} at ${company}.
Offer/Value prop: ${offer}
Tone: ${tone}
Include these exact sections with these exact labels:
[OPENER] - 5-second pattern interrupt, state your name and company
[PERMISSION ASK] - one sentence asking if they have 27 seconds
[VALUE PITCH] - the 15-second elevator pitch, outcome-focused
[DISCOVERY QUESTION] - one open question that uncovers pain
[OBJECTION: NOT INTERESTED] - 2 sentences, acknowledge + reframe
[CLOSE] - book a specific time, give two options
Output ONLY the script with section labels, nothing else.`,

  breakup_email: ({ prospectName, company, offer, tone }) => `
You are a sales psychologist. Write a break-up email to ${prospectName} at ${company}
after multiple unanswered outreaches about: ${offer}
Tone: ${tone}
Rules:
- Completely remove all sales pressure
- Be respectful and human
- Plant a seed for them to reach out when timing is right
- Under 60 words in the body
- Witty without being snarky — this sometimes re-engages cold prospects
Output format — SUBJECT: then BODY: — nothing else.`,
};
