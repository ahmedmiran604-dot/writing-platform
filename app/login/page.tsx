"use client";

import { useState } from "react";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-14 sm:px-8">
      <div className="text-center">
        <span className="font-display text-3xl italic text-navy">লেখাঘর</span>
        <p className="mt-2 text-sm text-ink/60">
          {mode === "login" ? "আপনার লেখার জগতে ফিরে আসুন" : "আজই লেখা শুরু করুন"}
        </p>
      </div>

      <form className="mt-10 space-y-5">
        {mode === "signup" && (
          <div>
            <label className="text-sm text-ink/70">নাম</label>
            <input
              type="text"
              className="mt-1 w-full border border-hairline bg-transparent px-3 py-2 text-ink focus:border-navy focus:outline-none"
              placeholder="আপনার নাম"
            />
          </div>
        )}
        <div>
          <label className="text-sm text-ink/70">ইমেইল</label>
          <input
            type="email"
            className="mt-1 w-full border border-hairline bg-transparent px-3 py-2 text-ink focus:border-navy focus:outline-none"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="text-sm text-ink/70">পাসওয়ার্ড</label>
          <input
            type="password"
            className="mt-1 w-full border border-hairline bg-transparent px-3 py-2 text-ink focus:border-navy focus:outline-none"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-navy py-2.5 text-cream transition-colors hover:bg-plum"
        >
          {mode === "login" ? "লগইন করুন" : "অ্যাকাউন্ট তৈরি করুন"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-ink/60">
        {mode === "login" ? "নতুন এখানে?" : "আগে থেকেই অ্যাকাউন্ট আছে?"}{" "}
        <button
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="text-navy hover:text-plum"
        >
          {mode === "login" ? "অ্যাকাউন্ট তৈরি করুন" : "লগইন করুন"}
        </button>
      </p>
    </div>
  );
}
