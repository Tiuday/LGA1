"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [magicLinkSent, setMagicLinkSent] = useState<boolean>(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const supabase = createClient();

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  async function handleMagicLink() {
    if (!email) {
      setError("Enter your email first.");
      return;
    }
    setError("");
    setLoading(true);
    const supabase = createClient();

    const { error: otpError } = await supabase.auth.signInWithOtp({ email });

    if (otpError) {
      setError(otpError.message);
    } else {
      setMagicLinkSent(true);
    }
    setLoading(false);
  }

  return (
    <div className="w-full max-w-sm">
      <div className="border border-surface-border bg-surface-2 p-8">
        <div className="mb-8">
          <span className="font-display font-bold text-xl text-white">
            Sales<span className="text-brand">.</span>Agent
          </span>
          <p className="mt-2 text-sm font-mono text-white/40">
            Sign in to your account
          </p>
        </div>

        {magicLinkSent ? (
          <div className="text-center py-4">
            <p className="text-sm font-mono text-brand">Magic link sent.</p>
            <p className="text-xs font-mono text-white/40 mt-2">
              Check your email to continue.
            </p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Input
              id="email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <p className="text-xs font-mono text-red-400">{error}</p>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-2"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <button
              type="button"
              onClick={handleMagicLink}
              className="text-xs font-mono text-white/40 hover:text-brand transition-colors duration-150 text-center"
            >
              Send magic link instead
            </button>
          </form>
        )}

        <p className="mt-6 text-xs font-mono text-white/30 text-center">
          No account?{" "}
          <Link
            href="/signup"
            className="text-brand hover:text-brand-light transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
