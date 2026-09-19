import { supabase } from "./supabase";

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  content: string;
  author_name: string;
  author_username: string;
  view_count: number;
  created_at: string;
};

export type Author = {
  username: string;
  name: string;
  bio: string;
};

// এখনো সত্যিকারের সাইনআপ/লগইন সিস্টেম চালু হয়নি, তাই লেখকদের পরিচিতি আপাতত এখানে রাখা হলো।
// পরে সাইনআপ চালু হলে এটা profiles টেবিল থেকে আসবে।
export const authors: Record<string, Author> = {
  "tanvir-hasan": {
    username: "tanvir-hasan",
    name: "তানভীর হাসান",
    bio: "ঢাকায় থাকি, লিখি শহর আর মানুষ নিয়ে। দিনের বেলা চাকরি, রাতে লেখালেখি।",
  },
  "nusrat-jahan": {
    username: "nusrat-jahan",
    name: "নুসরাত জাহান",
    bio: "শিক্ষার্থীদের পড়াই, আর অবসরে লিখি শিক্ষা আর ছোটবেলার গল্প।",
  },
  "rafiul-islam": {
    username: "rafiul-islam",
    name: "রাফিউল ইসলাম",
    bio: "বইপোকা, পুরনো বই আর পুরনো গল্পের খোঁজে ঘুরে বেড়াই।",
  },
};

export async function getAllPosts(): Promise<Post[]> {
  const { data } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();
  return data;
}

export async function getPostsByAuthor(username: string): Promise<Post[]> {
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("author_username", username)
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function incrementViewCount(slug: string) {
  await supabase.rpc("increment_view_count", { post_slug: slug });
}

/** Estimates reading time from word count (~200 words per minute), minimum 1 minute. */
export function getReadMinutes(post: Pick<Post, "content">) {
  const wordCount = post.content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(wordCount / 200));
}

const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
const banglaMonths = [
  "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
  "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
];

function toBanglaDigits(n: number) {
  return String(n)
    .split("")
    .map((c) => banglaDigits[Number(c)])
    .join("");
}

/** Formats an ISO date string into a Bangla display date, e.g. "১৯ সেপ্টেম্বর, ২০২৬". */
export function formatDate(dateString: string) {
  const d = new Date(dateString);
  return `${toBanglaDigits(d.getDate())} ${banglaMonths[d.getMonth()]}, ${toBanglaDigits(d.getFullYear())}`;
}