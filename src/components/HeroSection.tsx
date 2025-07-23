import { useEffect, useState } from 'react';
import {
  Home,
  User,
  FolderOpen,
  Briefcase,
  FileText,
  Rss,
  Award,
  Star
} from 'lucide-react';

const App = () => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative font-sans">
      {/* Navbar */}
      <nav className="w-full fixed top-0 left-0 z-50 bg-black/90 backdrop-blur-md text-white shadow-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-purple-400 tracking-wide">MA</div>

          {/* Navigation */}
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
            <li className="flex items-center gap-2 hover:text-purple-300 cursor-pointer"><Home size={18} /> Home</li>
            <li className="flex items-center gap-2 hover:text-purple-300 cursor-pointer"><User size={18} /> About</li>
            <li className="flex items-center gap-2 hover:text-purple-300 cursor-pointer"><FolderOpen size={18} /> Projects</li>
            <li className="flex items-center gap-2 hover:text-purple-300 cursor-pointer"><Briefcase size={18} /> Experiences</li>
            <li className="flex items-center gap-2 hover:text-purple-300 cursor-pointer"><FileText size={18} /> Resume</li>
            <li className="flex items-center gap-2 hover:text-purple-300 cursor-pointer"><Rss size={18} /> Blogs</li>
            <li className="flex items-center gap-2 hover:text-purple-300 cursor-pointer"><Award size={18} /> Certificates</li>
          </ul>

          <button className="ml-4 bg-neutral-900 text-white rounded-lg px-4 py-2 hover:bg-white hover:text-black transition-all">
            <Star size={16} className="inline mr-1" />
            Star
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image with Parallax */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform transition-transform duration-75"
          style={{
            backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/2/2c/Monte_bianco.JPG')`,
            transform: `translate3d(0, ${Math.min(offsetY * 0.4, 60)}px, 0)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-4 text-blue-900 md:text-7xl">
              Mohamed Amr
            </h1>
            <h2 className="text-2xl font-semibold mb-6 text-black">
              Machine learning
            </h2>
            <p className="text-lg md:text-xl text-neutral-800 mb-10 max-w-2xl mx-auto leading-relaxed">
              Transforming complex data into breakthrough insights through cutting-edge machine learning and AI innovation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-all">
                View Portfolio
              </button>
              <button className="bg-black hover:bg-neutral-800 text-white font-semibold px-8 py-3 rounded-lg transition-all">
                Download CV
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
