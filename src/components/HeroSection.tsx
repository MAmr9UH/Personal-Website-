// src/components/Navbar.tsx

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

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-[#0b0c1c]/90 backdrop-blur-md text-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-purple-400 tracking-wide">Ib.</div>

        {/* Navigation */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
          <li className="flex items-center gap-2 hover:text-purple-300 cursor-pointer">
            <Home size={18} />
            Home
          </li>
          <li className="flex items-center gap-2 hover:text-purple-300 cursor-pointer">
            <User size={18} />
            About
          </li>
          <li className="flex items-center gap-2 hover:text-purple-300 cursor-pointer">
            <FolderOpen size={18} />
            Projects
          </li>
          <li className="flex items-center gap-2 hover:text-purple-300 cursor-pointer">
            <Briefcase size={18} />
            Experiences
          </li>
          <li className="flex items-center gap-2 hover:text-purple-300 cursor-pointer">
            <FileText size={18} />
            Resume
          </li>
          <li className="flex items-center gap-2 hover:text-purple-300 cursor-pointer">
            <Rss size={18} />
            Blogs
          </li>
          <li className="flex items-center gap-2 hover:text-purple-300 cursor-pointer">
            <Award size={18} />
            Certificates
          </li>
        </ul>

        {/* Right button */}
        <div className="ml-4">
          <button className="flex items-center gap-2 bg-purple-700 hover:bg-purple-600 transition px-3 py-2 rounded-md text-sm font-semibold shadow">
            <Star size={16} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
