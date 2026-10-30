import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex flex-col justify-between">
      <div>
        <Navbar />
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}
