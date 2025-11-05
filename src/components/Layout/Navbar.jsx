import { Github, Code2 } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-gray-900/70 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="w-full px-8 py-4 flex items-center justify-between">
        {/* Left side: Logo */}
        <div className="flex items-center space-x-2">
          <Code2 className="text-white" size={26} />
          <span className="text-white text-lg font-semibold">CFManage</span>
        </div>

        {/* Right side: Links */}
        <div className="flex items-center space-x-6 m-10">
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
            className="text-white/80 hover:text-white transition-colors px-2"
          >
            <Github size={22} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
