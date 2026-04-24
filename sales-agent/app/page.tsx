"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const TYPEWRITER_ITEMS = [
  "Cold Email",
  "LinkedIn DM",
  "Follow-Up Email",
  "Call Script",
  "Break-Up Email",
];

const HOW_IT_WORKS = [
  { step: "01", title: "Enter Prospect", desc: "Name, company, your offer, and tone." },
  { step: "02", title: "AI Generates 5 Assets", desc: "Each asset runs as a live API call to Claude." },
  { step: "03", title: "Copy & Send", desc: "Full sequence ready in under 30 seconds." },
];

const SOCIAL_PROOF = [
  "5 outreach assets per prospect",
  "Zero writer's block",
  "Sequences that convert",
];

export default function LandingPage() {
  const [typewriterIndex, setTypewriterIndex] = useState<number>(0);
  const [displayText, setDisplayText] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    const current = TYPEWRITER_ITEMS[typewriterIndex];

    if (!isDeleting && displayText === current) {
      const pause = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(pause);
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setTypewriterIndex((i) => (i + 1) % TYPEWRITER_ITEMS.length);
      return;
    }

    const speed = isDeleting ? 40 : 70;
    const timer = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? current.slice(0, displayText.length - 1)
          : current.slice(0, displayText.length + 1)
      );
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, typewriterIndex]);

  return (
    <div className="min-h-screen bg-surface-1 overflow-hidden">
      {/* Animated grid background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.04) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.04) 40px)",
        }}
      />

      {/* Top nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-surface-border">
        <span className="font-display font-bold text-lg text-white">
          Sales<span className="text-brand">.</span>Agent
        </span>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-xs font-mono text-white/50 hover:text-white transition-colors px-3 py-1.5"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="text-xs font-mono bg-brand text-surface-1 px-4 py-2 hover:bg-brand-light transition-colors"
          >
            Start for Free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-4xl mx-auto px-8 pt-28 pb-20 text-center">
        <div className="inline-flex items-center gap-2 border border-brand/20 bg-brand/5 px-3 py-1 mb-8">
          <span className="w-1.5 h-1.5 bg-brand animate-glow-pulse" />
          <span className="text-xs font-mono text-brand">
            AI-powered outreach — 5 assets per prospect
          </span>
        </div>

        <h1 className="font-display font-extrabold text-5xl md:text-6xl text-white leading-tight tracking-tight mb-6">
          Your Next Customer Is<br />
          One Message Away
        </h1>

        <p className="text-base font-mono text-white/40 max-w-2xl mx-auto mb-4">
          AI-generated{" "}
          <span className="text-brand font-semibold">
            {displayText}
            <span className="animate-glow-pulse inline-block w-px h-4 bg-brand ml-0.5 align-middle" />
          </span>{" "}
          for any prospect, in seconds.
        </p>

        <p className="text-sm font-mono text-white/25 max-w-xl mx-auto mb-10">
          Cold emails, LinkedIn DMs, follow-ups, call scripts, and break-up
          emails — generated from a single form.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/signup"
            className="font-mono text-sm bg-brand text-surface-1 px-6 py-3 hover:bg-brand-light transition-colors font-semibold"
          >
            Start for Free
          </Link>
          <a
            href="#how-it-works"
            className="font-mono text-sm border border-surface-border text-white/50 px-6 py-3 hover:border-white/20 hover:text-white transition-colors"
          >
            See How It Works
          </a>
        </div>
      </section>

      {/* Mock pipeline preview */}
      <section className="relative z-10 max-w-3xl mx-auto px-8 pb-20">
        <div className="border border-surface-border bg-surface-2 p-6">
          <div className="flex items-center gap-2 mb-5 border-b border-surface-border pb-4">
            <div className="w-2 h-2 rounded-full bg-red-500/50" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
            <div className="w-2 h-2 rounded-full bg-green-500/50" />
            <span className="text-xs font-mono text-white/20 ml-2">
              Generating sequence for Sarah Chen · Acme SaaS
            </span>
          </div>
          <div className="flex items-center justify-between px-4">
            {[
              { label: "Cold Email", color: "#06B6D4", done: true },
              { label: "LinkedIn DM", color: "#0A66C2", done: true },
              { label: "Follow-Up", color: "#F59E0B", done: true },
              { label: "Call Script", color: "#10B981", active: true },
              { label: "Break-Up", color: "#EF4444" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div
                  className="w-10 h-10 border-2 flex items-center justify-center text-xs font-mono font-bold transition-all"
                  style={{
                    borderColor: item.done || item.active ? item.color : "#1a1a1a",
                    backgroundColor: item.done
                      ? item.color
                      : item.active
                      ? `${item.color}20`
                      : "transparent",
                    boxShadow: item.active ? `0 0 14px ${item.color}50` : "none",
                    color: item.done ? "#fff" : item.active ? item.color : "#ffffff20",
                  }}
                >
                  {item.done ? "✓" : i + 1}
                </div>
                <span
                  className="text-[9px] font-mono text-center leading-tight"
                  style={{
                    color:
                      item.done || item.active
                        ? item.color
                        : "rgba(255,255,255,0.15)",
                  }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="relative z-10 max-w-4xl mx-auto px-8 pb-24"
      >
        <h2 className="font-display font-bold text-2xl text-white text-center mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-surface-border">
          {HOW_IT_WORKS.map(({ step, title, desc }) => (
            <div key={step} className="bg-surface-2 p-6">
              <span className="text-xs font-mono text-brand/60 mb-3 block">
                {step}
              </span>
              <h3 className="font-display font-bold text-lg text-white mb-2">
                {title}
              </h3>
              <p className="text-sm font-mono text-white/40">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social proof strip */}
      <section className="relative z-10 border-t border-b border-surface-border py-5 mb-20">
        <div className="flex items-center justify-center gap-10 flex-wrap px-8">
          {SOCIAL_PROOF.map((item) => (
            <span key={item} className="text-xs font-mono text-white/30">
              — {item}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-xl mx-auto px-8 pb-32 text-center">
        <h2 className="font-display font-bold text-3xl text-white mb-4">
          Ready to fill your pipeline?
        </h2>
        <p className="text-sm font-mono text-white/40 mb-8">
          5 assets per prospect. No writer&apos;s block. Free to start.
        </p>
        <Link
          href="/signup"
          className="inline-block font-mono text-sm bg-brand text-surface-1 px-8 py-3 hover:bg-brand-light transition-colors font-semibold"
        >
          Start for Free
        </Link>
      </section>
    </div>
  );
}
