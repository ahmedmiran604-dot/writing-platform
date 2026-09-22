"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const categories = [
  "গল্প",
  "কবিতা",
  "প্রবন্ধ",
  "মতামত",
  "স্মৃতিচারণ",
  "উপন্যাস",
  "ক্লাসিক",
  "হরর",
  "থ্রিলার",
  "রোমান্টিক",
  "ফিকশন",
  "পল্লীসাহিত্য",
];

function makeSlug() {
  return crypto.randomUUID().split("-")[0];
}

type Profile = { name: string; username: string; avatar_url: string | null };

export default function WritePage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [content, setContent] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data: profileData } = await supabase
        .from("profiles")
        .select("name, username, avatar_url")
        .eq("id", user.id)
        .single();

      setProfile(profileData);
      setChecking(false);
    }

    checkUser();
  }, [router]);

  function handleCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setCoverFile(file);
    setCoverPreview(file ? URL.createObjectURL(file) : null);
  }

  async function handlePublish() {
    setError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !profile) {
      setError("লগইন সেশন পাওয়া যায়নি, আবার লগইন করুন।");
      return;
    }

    setPublishing(true);

    let coverUrl: string | null = null;

    if (coverFile) {
      const path = `${user.id}/${Date.now()}-${coverFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from("covers")
        .upload(path, coverFile);

      if (uploadError) {
        setError("কভার ছবি আপলোড করা যায়নি: " + uploadError.message);
        setPublishing(false);
        return;
      }

      const { data } = supabase.storage.from("covers").getPublicUrl(path);
      coverUrl = data.publicUrl;
    }

    const excerpt = content.trim().slice(0, 140);
    const slug = makeSlug();

    const { error: insertError } = await supabase.from("posts").insert({
      slug,
      title,
      excerpt,
      category,
      content: content.trim(),
      author_id: user.id,
      author_name: profile.name,
      author_username: profile.username,
      author_avatar_url: profile.avatar_url,
      cover_url: coverUrl,
    });

    if (insertError) {
      setError(insertError.message);
      setPublishing(false);
      return;
    }

    router.push(`/read/${slug}`);
  }

  if (checking) {
    return (
      <div className="mx-auto max-w-prose px-5 py-20 text-center text-ink/50 sm:px-8">
        লোড হচ্ছে...
      </div>
    );
  }

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
            <rect x="3" y="5" width="18" height="14" rx="1" />
            <circle cx="9" cy="10" r="1.5" />
            <path d="M4 17l5-5 4 4 3-3 4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          কভার ছবি
          <input type="file" accept="image/*" className="hidden" onChange={handleCoverChange} />
        </label>
        {coverFile && <span className="text-ink/50">{coverFile.name}</span>}
      </div>

      {coverPreview && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={coverPreview} alt="" className="mt-4 h-48 w-full object-cover" />
      )}

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="আপনার লেখা এখানে শুরু করুন... (নতুন প্যারাগ্রাফের জন্য দুটো এন্টার দিন)"
        rows={16}
        className="mt-6 w-full resize-none border-none bg-transparent text-lg leading-[1.9] text-ink placeholder:text-ink/30 focus:outline-none"
      />

      {error && <p className="text-sm text-red-700">{error}</p>}

      <div className="mt-8 flex items-center justify-between border-t border-hairline pt-6">
        <span className="text-sm text-ink/50">{profile?.name}-এর নামে প্রকাশিত হবে</span>
        <button
          onClick={handlePublish}
          disabled={!title || !content || publishing}
          className="bg-navy px-5 py-2 text-sm text-cream transition-colors hover:bg-plum disabled:cursor-not-allowed disabled:opacity-40"
        >
          {publishing ? "প্রকাশ হচ্ছে..." : "প্রকাশ করুন"}
        </button>
      </div>
    </div>
  );
}