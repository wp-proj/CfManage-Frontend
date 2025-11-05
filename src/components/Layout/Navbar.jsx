import { Link, useLocation } from "react-router-dom";
import { Github, Code2, Home, Users2 } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "text-blue-400 font-semibold"
      : "text-white/80 hover:text-white";

  return (
    <nav className="bg-gray-900/70 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="w-full px-10 py-4 flex items-center justify-between">
        {/* LEFT SIDE: Logo + Main Links */}
        <div className="flex items-center gap-12">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Code2 className="text-blue-400" size={26} />
            <span className="text-white text-lg font-semibold tracking-wide">
              CFManage
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className={`flex items-center gap-2 transition-colors ${isActive("/")}`}
            >
              <Home size={18} />
              Home
            </Link>

            <Link
              to="/compare"
              className={`flex items-center gap-2 transition-colors ${isActive("/compare")}`}
            >
              <Users2 size={18} />
              Compare
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE: External Links */}
        <div className="flex items-center gap-8">
          <a
            href="https://codeforces.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white transition-colors"
          >
            Codeforces
          </a>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white transition-colors"
          >
            <Github size={22} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
