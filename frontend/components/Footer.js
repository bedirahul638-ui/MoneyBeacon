import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-8 mt-12 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p>© {new Date().getFullYear()} US Smart Money. All rights reserved.</p>
        <div className="space-x-4 mt-4 md:mt-0">
          <Link href="/about" className="hover:text-white">About Us</Link>
          <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
          <Link href="/disclaimer" className="hover:text-white">Disclaimer</Link>
        </div>
      </div>
    </footer>
  );
}
