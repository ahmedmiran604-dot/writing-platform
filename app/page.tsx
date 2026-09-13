import Link from "next/link";
import PostCard from "@/components/PostCard";
import { posts } from "@/lib/sample-data";

export default function HomePage() {
  const [featured, ...rest] = posts;

  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8">
      {/* Hero / featured post */}
      <section className="border-b border-hairline py-14 sm:py-20">
        <p className="text-sm text-plum">{featured.category}</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-navy sm:text-5xl">
          {featured.title}
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/75">
          {featured.excerpt}
        </p>
        <div className="mt-6 flex items-center gap-4 text-sm text-ink/60">
          <Link href={`/profile/${featured.authorUsername}`} className="text-ink hover:text-navy">
            {featured.authorName}
          </Link>
          <span>{featured.date}</span>
          <span>{featured.readMinutes} মিনিট পড়া</span>
        </div>
        <Link
          href={`/read/${featured.slug}`}
          className="mt-8 inline-block border-b border-navy pb-0.5 text-navy transition-colors hover:border-plum hover:text-plum"
        >
          সম্পূর্ণ পড়ুন
        </Link>
      </section>

      {/* Recent posts grid */}
      <section className="py-12 sm:py-16">
        <h2 className="font-display text-2xl text-navy">সাম্প্রতিক লেখা</h2>
        <div className="mt-6 grid grid-cols-1 gap-x-10 md:grid-cols-3">
          {rest.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <div className="ornament pb-12 text-lg">❧</div>
    </div>
  );
}
