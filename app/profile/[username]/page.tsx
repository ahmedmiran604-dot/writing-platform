import { notFound } from "next/navigation";
import PostCard from "@/components/PostCard";
import { authors, getPostsByAuthor } from "@/lib/sample-data";

export function generateStaticParams() {
  return Object.keys(authors).map((username) => ({ username }));
}

export default function ProfilePage({ params }: { params: { username: string } }) {
  const author = authors[params.username];
  if (!author) notFound();

  const authorPosts = getPostsByAuthor(params.username);

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
      <div className="flex items-center gap-5">
        <div className="flex h-16 w-16 items-center justify-center border border-hairline font-display text-2xl text-navy">
          {author.name.charAt(0)}
        </div>
        <div>
          <h1 className="font-display text-2xl text-navy">{author.name}</h1>
          <p className="mt-1 flex gap-4 text-sm text-ink/60">
            <span>{author.postCount} টি লেখা</span>
            <span>{author.followerCount} জন অনুসরণকারী</span>
          </p>
        </div>
      </div>

      <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/75">{author.bio}</p>

      <div className="mt-12">
        <h2 className="font-display text-xl text-navy">লেখাসমূহ</h2>
        <div className="mt-4">
          {authorPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
