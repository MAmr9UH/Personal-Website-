import { useEffect, useState } from 'react';
import { Home, User, FolderOpen, Briefcase, FileText, Rss, Award, Star } from 'lucide-react';
const App = () => {
  const [offsetY, setOffsetY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <div className="relative font-sans">
      {/* ───── NAVBAR ───── */}
      <nav className="fixed inset-x-0 top-0 z-50 backdrop-blur-md px-6 py-4 text-white shadow-md bg-slate-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between bg-gray-950">
          <span className="text-2xl font-bold tracking-wide text-blue-300">MA</span>

          <ul className="hidden items-center gap-6 text-sm font-medium md:flex">
            <li className="flex items-center gap-2 hover:text-purple-300"><Home size={18} />Home</li>
            <li className="flex items-center gap-2 hover:text-purple-300"><User size={18} />About</li>
            <li className="flex items-center gap-2 hover:text-purple-300"><FolderOpen size={18} />Projects</li>
            <li className="flex items-center gap-2 hover:text-purple-300"><Briefcase size={18} />Experiences</li>
            <li className="flex items-center gap-2 hover:text-purple-300"><FileText size={18} />Resume</li>
            <li className="flex items-center gap-2 hover:text-purple-300"><Rss size={18} />Blogs</li>
            <li className="flex items-center gap-2 hover:text-purple-300"><Award size={18} />Certificates</li>
          </ul>

          <button className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium hover:bg-white hover:text-black transition">
            <Star size={16} className="mr-1 inline" />Star
          </button>
        </div>
      </nav>

      {/* ───── HERO SECTION ───── */}
      <section className="relative h-screen overflow-hidden pt-20">
        {/* Parallax image */}
        <div className="absolute inset-0 bg-cover bg-center will-change-transform transition-transform duration-75" style={{
        backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/2/2c/Monte_bianco.JPG')",
        transform: `translate3d(0, ${Math.min(offsetY * 0.4, 60)}px, 0)`
      }} />

        {/* Content */}
        <div className="relative z-10 flex h-full items-center justify-center px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-4 text-5xl font-bold text-blue-900 md:text-7xl">Mohamed Amr</h1>
            <h2 className="mb-6 text-2xl font-semibold text-black">Machine learning</h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-neutral-800">
              Transforming complex data into breakthrough insights through cutting‑edge machine learning and AI innovation.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700 transition">View Portfolio</button>
              <button className="rounded-lg bg-black px-8 py-3 font-semibold text-white hover:bg-neutral-800 transition">Download CV</button>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default App;