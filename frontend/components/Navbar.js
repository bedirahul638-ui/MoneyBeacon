import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  return (
    <nav className="bg-slate-900 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-emerald-400">
          US Smart Money
        </Link>
        <div className="space-x-6 flex items-center">
          <Link href="/" className="hover:text-emerald-400">Home</Link>
          <Link href="/about" className="hover:text-emerald-400">About Us</Link>
          <Link href="/privacy-policy" className="hover:text-emerald-400">Privacy Policy</Link>

          {user?.role === 'admin' && (
            <Link href="/admin/dashboard" className="text-amber-400 font-semibold border border-amber-400 px-3 py-1 rounded">
              Admin Panel
            </Link>
          )}

          {user ? (
            <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-4 py-1.5 rounded">
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" className="hover:text-emerald-400">Login</Link>
              <Link href="/signup" className="bg-emerald-500 hover:bg-emerald-600 px-4 py-1.5 rounded text-slate-900 font-bold">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
