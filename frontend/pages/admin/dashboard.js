import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({ title: '', slug: '', summary: '', category: 'Credit Cards', content: '' });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    // Strict Admin Verification
    if (!user || user.role !== 'admin' || !token) {
      router.push('/login');
    } else {
      setLoading(false);
      fetchPosts();
    }
  }, []);

  const fetchPosts = async () => {
    const res = await fetch(`${API_URL}/api/posts`);
    const data = await res.json();
    setPosts(data);
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const res = await fetch(`${API_URL}/api/admin/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      alert('Post Created Successfully!');
      setFormData({ title: '', slug: '', summary: '', category: 'Credit Cards', content: '' });
      fetchPosts();
    } else {
      alert('Error creating post');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    const token = localStorage.getItem('token');

    await fetch(`${API_URL}/api/admin/posts/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    fetchPosts();
  };

  if (loading) return <div className="p-10 text-center">Verifying Admin Permissions...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-amber-400">Admin Control Panel</h1>

      {/* Create New Post Form */}
      <form onSubmit={handleCreatePost} className="bg-slate-900 border border-slate-800 p-6 rounded-xl mb-10 space-y-4">
        <h2 className="text-xl font-bold text-white">Create New Finance Post</h2>
        <input 
          type="text" placeholder="Post Title" required className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded text-white"
          value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
        />
        <input 
          type="text" placeholder="URL Slug (e.g. best-credit-cards-2026)" required className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded text-white"
          value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})}
        />
        <input 
          type="text" placeholder="Short Summary" required className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded text-white"
          value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})}
        />
        <select 
          className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded text-white"
          value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
        >
          <option>Credit Cards</option>
          <option>High Yield Savings</option>
          <option>Investing</option>
          <option>Taxes & Loans</option>
        </select>
        <textarea 
          placeholder="Post Full Content (Markdown or HTML supported)" rows="8" required className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded text-white"
          value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})}
        ></textarea>
        <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-6 py-2.5 rounded">
          Publish Post
        </button>
      </form>

      {/* Posts List */}
      <h2 className="text-2xl font-bold mb-4">Manage Posts</h2>
      <div className="space-y-4">
        {posts.map(p => (
          <div key={p._id} className="bg-slate-900 p-4 border border-slate-800 rounded flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">{p.title}</h3>
              <span className="text-xs text-slate-400">{p.category} | {p.slug}</span>
            </div>
            <button onClick={() => handleDelete(p._id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
