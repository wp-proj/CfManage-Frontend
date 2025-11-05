import { Github, Code2 } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code2 className="text-white" size={32} />
            <span className="text-white text-xl font-bold">CF Viewer</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <a
              href="https://codeforces.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition"
            >
              Codeforces
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition"
            >
              <Github size={24} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
