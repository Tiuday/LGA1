"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10 text-center">
      <p className="text-sm font-mono text-red-400 mb-4">Something went wrong.</p>
      <button
        onClick={reset}
        className="text-xs font-mono text-brand border border-brand/30 px-4 py-2 hover:bg-brand/10 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
