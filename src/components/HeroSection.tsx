import { useEffect, useState } from 'react';
import {
  Home,
  User,
  FolderOpen,
  Briefcase,
  FileText,
  Rss,
  Award,
  Star,
} from 'lucide-react';

function App() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-black text-white">
      {/* Navbar */}
      <nav className="w-full fixed top-0 left-0 z-50 bg-black/90 backdrop-blur-md text-white shadow-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-purple-300 tracking-wide">Ib.</div>
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
            <li className="flex items-center gap-2 hover:text-purple-400 cursor-pointer"><Home size={18} /> Home</li>
            <li className="flex items-center gap-2 hover:text-purple-400 cursor-pointer"><User size={18} /> About</li>
            <li className="flex items-center gap-2 hover:text-purple-400 cursor-pointer"><FolderOpen size={18} /> Projects</li>
            <li className="flex items-center gap-2 hover:text-purple-400 cursor-pointer"><Briefcase size={18} /> Experiences</li>
            <li className="flex items-center gap-2 hover:text-purple-400 cursor-pointer"><FileText size={18} /> Resume</li>
            <li className="flex items-center gap-2 hover:text-purple-400 cursor-pointer"><Rss size={18} /> Blogs</li>
            <li className="flex items-center gap-2 hover:text-purple-400 cursor-pointer"><Award size={18} /> Certificates</li>
          </ul>
          <div className="ml-4">
            <button className="flex items-center gap-2 px-3 py-2 rounded-md bg-black hover:bg-neutral-800 transition text-white text-sm font-medium shadow">
              <Star size={16} />
              Star
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform transition-transform duration-75"
          style={{
            backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/2/2c/Monte_bianco.JPG')`,
            transform: `translate3d(0, ${Math.min(offsetY * 0.4, 60)}px, 0)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-white" />
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-blue-900 mb-2">Mohamed Amr</h1>
            <h2 className="text-2xl font-semibold text-black mb-4">Machine learning</h2>
            <p className="text-gray-100 text-md max-w-xl mx-auto mb-6">
              Transforming complex data into breakthrough insights through cutting-edge machine learning and AI innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-semibold shadow">
                View Portfolio
              </button>
              <button className="bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-md font-semibold shadow">
                Download CV
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
