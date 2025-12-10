import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 bg-cyber-black/90 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-display font-bold text-neon-green tracking-widest">
          TAS<span className="text-white">NIM</span>
        </Link>
        <div className="space-x-8 font-mono hidden md:block">
          <Link to="/" className="text-gray-300 hover:text-neon-green transition">Home</Link>
          <a href="#projects" className="text-gray-300 hover:text-neon-green transition">Projects</a>
          <Link to="/admin" className="text-gray-300 hover:text-neon-blue transition">Admin</Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;