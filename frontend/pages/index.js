import Link from 'next/link';

export async function getServerSideProps() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const res = await fetch(`${API_URL}/api/posts`);
  const posts = await res.json();

  return { props: { posts: Array.isArray(posts) ? posts : [] } };
}

export default function Home({ posts }) {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-900 py-20 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Master Your Money in the <span className="text-emerald-400">United States</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Expert insights on Credit Cards, High-Yield Savings Accounts, Investments, Tax Strategies, and Personal Finance for US Residents.
          </p>
          <Link href="/signup" className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-8 py-3.5 rounded-lg text-lg transition">
            Join Finance Community
          </Link>
        </div>
      </section>

      {/* Posts Grid */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-emerald-400">Latest Financial Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post._id} className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold uppercase text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full">
                  {post.category}
                </span>
                <h3 className="text-xl font-bold mt-3 mb-2 text-white hover:text-emerald-300">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-slate-400 text-sm line-clamp-3">{post.summary}</p>
              </div>
              <Link href={`/blog/${post.slug}`} className="mt-6 text-emerald-400 text-sm font-semibold hover:underline">
                Read Article →
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
