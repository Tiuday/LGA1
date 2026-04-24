"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmed, setConfirmed] = useState<boolean>(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const supabase = createClient();

    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    setConfirmed(true);
    setLoading(false);

    setTimeout(() => router.push("/dashboard"), 1500);
  }

  return (
    <div className="w-full max-w-sm">
      <div className="border border-surface-border bg-surface-2 p-8">
        <div className="mb-8">
          <span className="font-display font-bold text-xl text-white">
            Sales<span className="text-brand">.</span>Agent
          </span>
          <p className="mt-2 text-sm font-mono text-white/40">
            Create your free account
          </p>
        </div>

        {confirmed ? (
          <div className="text-center py-4">
            <p className="text-sm font-mono text-brand">Account created.</p>
            <p className="text-xs font-mono text-white/40 mt-2">
              Redirecting to dashboard...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSignup} className="flex flex-col gap-4">
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
              placeholder="Min. 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
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
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>
        )}

        <p className="mt-6 text-xs font-mono text-white/30 text-center">
          Have an account?{" "}
          <Link
            href="/login"
            className="text-brand hover:text-brand-light transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
