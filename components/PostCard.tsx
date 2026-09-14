import Link from "next/link";
import { getReadMinutes, type Post } from "@/lib/sample-data";

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="flex flex-col gap-3 border-b border-hairline py-6 first:pt-0">
      <span className="text-xs text-plum">{post.category}</span>

      <Link href={`/read/${post.slug}`} className="group">
        <h3 className="font-display text-xl leading-snug text-navy transition-colors group-hover:text-plum">
          {post.title}
        </h3>
      </Link>

      <p className="text-sm leading-relaxed text-ink/75 line-clamp-2">
        {post.excerpt}
      </p>

      <div className="flex items-center justify-between pt-1 text-xs text-ink/55">
        <Link href={`/profile/${post.authorUsername}`} className="hover:text-navy">
          {post.authorName}
        </Link>
        <span>{getReadMinutes(post)} মিনিট পড়া</span>
      </div>
    </article>
  );
}