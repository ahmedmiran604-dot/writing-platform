import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, posts } from "@/lib/sample-data";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default function ReadPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-prose px-5 py-14 sm:px-8 sm:py-20">
      <p className="text-sm text-plum">{post.category}</p>
      <h1 className="mt-4 font-display text-3xl leading-tight text-navy sm:text-4xl">
        {post.title}
      </h1>

      <div className="mt-5 flex items-center gap-4 border-b border-hairline pb-6 text-sm text-ink/60">
        <Link href={`/profile/${post.authorUsername}`} className="text-ink hover:text-navy">
          {post.authorName}
        </Link>
        <span>{post.date}</span>
        <span>{post.readMinutes} মিনিট পড়া</span>
      </div>

      <div className="mt-8 space-y-6 text-lg leading-[1.9] text-ink">
        {post.content.map((paragraph, index) => (
          <p key={index} className={index === 0 ? "drop-cap" : undefined}>
            {paragraph}
          </p>
        ))}
      </div>

      <div className="ornament mt-14 text-lg">❦</div>

      <div className="mt-10 flex items-center justify-between text-sm">
        <Link href="/" className="text-navy hover:text-plum">
          ← হোমে ফিরুন
        </Link>
        <Link href={`/profile/${post.authorUsername}`} className="text-navy hover:text-plum">
          {post.authorName}-এর আরও লেখা →
        </Link>
      </div>
    </article>
  );
}
