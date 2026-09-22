import Link from "next/link";
import PostCard from "@/components/PostCard";
import { formatDate, getAllPosts, getReadMinutes } from "@/lib/sample-data";

export const revalidate = 0;

export default async function HomePage() {
  const posts = await getAllPosts();
  const [featured, ...rest] = posts;

  if (!featured) {
    return (
      <div className="mx-auto max-w-5xl px-5 py-20 text-center text-ink/60 sm:px-8">
        এখনো কোনো লেখা প্রকাশিত হয়নি।
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8">
      {/* Hero / featured post */}
      <section className="grid grid-cols-1 items-center gap-8 border-b border-hairline py-14 sm:py-20 md:grid-cols-5 md:gap-12">
        <div className={featured.cover_url ? "md:col-span-3" : "md:col-span-5"}>
          <p className="text-sm text-plum">{featured.category}</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-navy sm:text-5xl">
            {featured.title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/75">
            {featured.excerpt}
          </p>
          <div className="mt-6 flex items-center gap-4 text-sm text-ink/60">
            <Link href={`/profile/${featured.author_username}`} className="text-ink hover:text-navy">
              {featured.author_name}
            </Link>
            <span>{formatDate(featured.created_at)}</span>
            <span>{getReadMinutes(featured)} মিনিট পড়া</span>
          </div>
          <Link
            href={`/read/${featured.slug}`}
            className="mt-8 inline-block border-b border-navy pb-0.5 text-navy transition-colors hover:border-plum hover:text-plum"
          >
            সম্পূর্ণ পড়ুন
          </Link>
        </div>
        {featured.cover_url && (
          <Link href={`/read/${featured.slug}`} className="block md:col-span-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={featured.cover_url}
              alt=""
              className="h-56 w-full object-cover sm:h-72 md:h-80"
            />
          </Link>
        )}
      </section>

      {/* Recent posts grid */}
      {rest.length > 0 && (
        <section className="py-12 sm:py-16">
          <h2 className="font-display text-2xl text-navy">সাম্প্রতিক লেখা</h2>
          <div className="mt-6 grid grid-cols-1 gap-x-10 md:grid-cols-3">
            {rest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      <div className="ornament pb-12 text-lg">❧</div>
    </div>
  );
}