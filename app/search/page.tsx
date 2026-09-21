"use client";

import { useEffect, useMemo, useState } from "react";
import PostCard from "@/components/PostCard";
import { getAllPosts, type Post } from "@/lib/sample-data";

const genres = [
  "গল্প", "কবিতা", "প্রবন্ধ", "মতামত", "স্মৃতিচারণ",
  "উপন্যাস", "ক্লাসিক", "হরর", "থ্রিলার", "রোমান্টিক", "ফিকশন",
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [activeGenre, setActiveGenre] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPosts().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim();
    return posts.filter((post) => {
      const matchesQuery =
        q === "" || post.title.includes(q) || post.excerpt.includes(q);
      const matchesGenre = !activeGenre || post.category === activeGenre;
      return matchesQuery && matchesGenre;
    });
  }, [posts, query, activeGenre]);

  const availableGenres = useMemo(
    () => genres.filter((g) => posts.some((p) => p.category === g)),
    [posts]
  );

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
      <h1 className="font-display text-3xl text-navy">খুঁজুন</h1>

      <input
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="শিরোনাম বা বিষয় লিখে খুঁজুন..."
        className="mt-6 w-full border-b border-hairline bg-transparent py-3 text-lg text-ink placeholder:text-ink/30 focus:border-navy focus:outline-none"
      />

      {availableGenres.length > 0 && (
        <div className="mt-5">
          <p className="text-xs text-ink/50">জনরা অনুযায়ী দেখুন</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {availableGenres.map((g) => (
              <button
                key={g}
                onClick={() => setActiveGenre(activeGenre === g ? null : g)}
                className={`border px-3 py-1 text-sm transition-colors ${
                  activeGenre === g
                    ? "border-navy bg-navy text-cream"
                    : "border-hairline text-ink/70 hover:border-navy hover:text-navy"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10">
        {loading ? (
          <p className="text-ink/50">লোড হচ্ছে...</p>
        ) : filtered.length === 0 ? (
          <p className="text-ink/50">কোনো লেখা পাওয়া যায়নি।</p>
        ) : (
          filtered.map((post) => <PostCard key={post.slug} post={post} />)
        )}
      </div>
    </div>
  );
}