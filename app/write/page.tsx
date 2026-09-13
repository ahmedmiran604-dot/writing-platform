"use client";

import { useState } from "react";

const categories = ["গল্প", "কবিতা", "প্রবন্ধ", "মতামত", "স্মৃতিচারণ"];

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [content, setContent] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [status, setStatus] = useState<"draft" | "published" | null>(null);

  return (
    <div className="mx-auto max-w-prose px-5 py-14 sm:px-8 sm:py-20">
      <p className="text-sm text-plum">নতুন লেখা</p>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="শিরোনাম লিখুন..."
        className="mt-4 w-full border-none bg-transparent font-display text-3xl text-navy placeholder:text-navy/30 focus:outline-none sm:text-4xl"
      />

      <div className="mt-6 flex flex-wrap items-center gap-4 border-y border-hairline py-4 text-sm">
        <label className="flex items-center gap-2 text-ink/70">
          বিভাগ
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-hairline bg-cream px-2 py-1 text-ink focus:outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="flex cursor-pointer items-center gap-2 text-ink/70 hover:text-navy">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 16V4M12 4l-4 4M12 4l4 4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          ফাইল যুক্ত করুন
          <input
            type="file"
            className="hidden"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
          />
        </label>
        {fileName && <span className="text-ink/50">{fileName}</span>}
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="আপনার লেখা এখানে শুরু করুন..."
        rows={16}
        className="mt-6 w-full resize-none border-none bg-transparent text-lg leading-[1.9] text-ink placeholder:text-ink/30 focus:outline-none"
      />

      <div className="mt-8 flex items-center justify-between border-t border-hairline pt-6">
        <span className="text-sm text-ink/50">
          {status === "draft" && "ড্রাফট হিসেবে সংরক্ষিত হয়েছে"}
          {status === "published" && "লেখাটি প্রকাশিত হয়েছে"}
        </span>
        <div className="flex gap-3">
          <button
            onClick={() => setStatus("draft")}
            className="border border-hairline px-5 py-2 text-sm text-ink/70 transition-colors hover:border-navy hover:text-navy"
          >
            ড্রাফট সংরক্ষণ
          </button>
          <button
            onClick={() => setStatus("published")}
            disabled={!title || !content}
            className="bg-navy px-5 py-2 text-sm text-cream transition-colors hover:bg-plum disabled:cursor-not-allowed disabled:opacity-40"
          >
            প্রকাশ করুন
          </button>
        </div>
      </div>
    </div>
  );
}
