"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (mode === "signup") {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        const { error: profileError } = await supabase.from("profiles").insert({
          id: data.user.id,
          username,
          name,
        });

        if (profileError) {
          setError(profileError.message);
          setLoading(false);
          return;
        }
      }

      router.push("/");
      router.refresh();
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      router.push("/");
      router.refresh();
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-14 sm:px-8">
      <div className="text-center">
        <span className="font-display text-3xl italic text-navy">লেখাঘর</span>
        <p className="mt-2 text-sm text-ink/60">
          {mode === "login" ? "আপনার লেখার জগতে ফিরে আসুন" : "আজই লেখা শুরু করুন"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-10 space-y-5">
        {mode === "signup" && (
          <>
            <div>
              <label className="text-sm text-ink/70">নাম</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full border border-hairline bg-transparent px-3 py-2 text-ink focus:border-navy focus:outline-none"
                placeholder="আপনার নাম"
              />
            </div>
            <div>
              <label className="text-sm text-ink/70">ইউজারনেম (প্রোফাইল লিংকের জন্য)</label>
              <input
                type="text"
                required
                pattern="[a-z0-9-]+"
                title="শুধু ছোট হাতের ইংরেজি অক্ষর, সংখ্যা ও হাইফেন"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 w-full border border-hairline bg-transparent px-3 py-2 text-ink focus:border-navy focus:outline-none"
                placeholder="যেমন: rahim-uddin"
              />
            </div>
          </>
        )}
        <div>
          <label className="text-sm text-ink/70">ইমেইল</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full border border-hairline bg-transparent px-3 py-2 text-ink focus:border-navy focus:outline-none"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="text-sm text-ink/70">পাসওয়ার্ড</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full border border-hairline bg-transparent px-3 py-2 text-ink focus:border-navy focus:outline-none"
            placeholder="••••••••"
          />
        </div>

        {error && <p className="text-sm text-red-700">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-navy py-2.5 text-cream transition-colors hover:bg-plum disabled:opacity-50"
        >
          {loading ? "অপেক্ষা করুন..." : mode === "login" ? "লগইন করুন" : "অ্যাকাউন্ট তৈরি করুন"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-ink/60">
        {mode === "login" ? "নতুন এখানে?" : "আগে থেকেই অ্যাকাউন্ট আছে?"}{" "}
        <button
          onClick={() => {
            setMode(mode === "login" ? "signup" : "login");
            setError(null);
          }}
          className="text-navy hover:text-plum"
        >
          {mode === "login" ? "অ্যাকাউন্ট তৈরি করুন" : "লগইন করুন"}
        </button>
      </p>
    </div>
  );
}