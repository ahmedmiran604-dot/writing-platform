import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatDate,
  getPostBySlug,
  getReadMinutes,
  incrementViewCount,
} from "@/lib/sample-data";

export const revalidate = 0;

export default async function ReadPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  incrementViewCount(params.slug);

  const paragraphs = post.content.split("\n\n").filter(Boolean);

  return (
    <article className="mx-auto max-w-prose px-5 py-14 sm:px-8 sm:py-20">
      <p className="text-sm text-plum">{post.category}</p>
      <h1 className="mt-4 font-display text-3xl leading-tight text-navy sm:text-4xl">
        {post.title}
      </h1>

      <div className="mt-5 flex items-center gap-4 border-b border-hairline pb-6 text-sm text-ink/60">
        <Link href={`/profile/${post.author_username}`} className="text-ink hover:text-navy">
          {post.author_name}
        </Link>
        <span>{formatDate(post.created_at)}</span>
        <span>{getReadMinutes(post)} মিনিট পড়া</span>
        <span>{post.view_count + 1} বার পঠিত</span>
      </div>

      <div className="mt-8 space-y-6 text-lg leading-[1.9] text-ink">
        {paragraphs.map((paragraph, index) => (
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
        <Link href={`/profile/${post.author_username}`} className="text-navy hover:text-plum">
          {post.author_name}-এর আরও লেখা →
        </Link>
      </div>
    </article>
  );
}