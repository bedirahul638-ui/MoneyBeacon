export async function getServerSideProps({ params }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const res = await fetch(`${API_URL}/api/posts/${params.slug}`);
  const post = await res.json();

  return { props: { post } };
}

export default function BlogPost({ post }) {
  if (!post || post.message) return <div className="text-center py-20">Article not found.</div>;

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <span className="text-sm text-emerald-400 uppercase font-semibold">{post.category}</span>
      <h1 className="text-4xl font-extrabold my-4 text-white">{post.title}</h1>
      <p className="text-slate-400 text-sm mb-8">Published by {post.author} on {new Date(post.createdAt).toLocaleDateString()}</p>
      <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-4 whitespace-pre-wrap">
        {post.content}
      </div>
    </article>
  );
}
