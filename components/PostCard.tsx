import Link from "next/link";
import { getReadMinutes, type Post } from "@/lib/sample-data";

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="flex flex-col gap-3 border-b border-hairline py-6 first:pt-0">
      {post.cover_url && (
        <Link href={`/read/${post.slug}`} className="block overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.cover_url}
            alt=""
            className="h-40 w-full object-cover"
          />
        </Link>
      )}

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
        <Link
          href={`/profile/${post.author_username}`}
          className="flex items-center gap-2 hover:text-navy"
        >
          {post.author_avatar_url ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={post.author_avatar_url}
              alt=""
              className="h-5 w-5 rounded-full object-cover"
            />
          ) : (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-navy/10 text-[10px] text-navy">
              {post.author_name.charAt(0)}
            </span>
          )}
          {post.author_name}
        </Link>
        <span>{getReadMinutes(post)} মিনিট পড়া</span>
      </div>
    </article>
  );
}