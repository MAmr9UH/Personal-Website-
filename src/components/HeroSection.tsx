import { Home, User, FolderOpen, Briefcase, FileText, Rss, Award, Star } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 bg-black/90 backdrop-blur-md text-white fixed top-0 z-50">
      {/* Logo */}
      <div className="text-2xl font-bold text-purple-300">Ib.</div>

      {/* Navigation Links */}
      <ul className="flex gap-6 items-center text-sm md:text-base font-medium">
        <li className="flex items-center gap-1">
          <Home size={18} />
          <span>Home</span>
        </li>
        <li className="flex items-center gap-1">
          <User size={18} />
          <span>About</span>
        </li>
        <li className="flex items-center gap-1">
          <FolderOpen size={18} />
          <span>Projects</span>
        </li>
        <li className="flex items-center gap-1">
          <Briefcase size={18} />
          <span>Experiences</span>
        </li>
        <li className="flex items-center gap-1">
          <FileText size={18} />
          <span>Resume</span>
        </li>
        <li className="flex items-center gap-1">
          <Rss size={18} />
          <span>Blogs</span>
        </li>
        <li className="flex items-center gap-1">
          <Award size={18} />
          <span>Certificates</span>
        </li>
      </ul>

      {/* Button (e.g., GitHub or Theme Toggle) */}
      <button className="ml-4 flex items-center gap-2 px-3 py-2 rounded-md bg-purple-700 hover:bg-purple-600 transition">
        <Star size={16} />
      </button>
    </nav>
  );
};

export default Navbar;
