import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/scan", label: "Scan" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/rules", label: "Rules" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const visibleLinks = navLinks.filter((link) => link.to !== location.pathname);

  return (
    <nav className="bg-gray-950 border-b border-gray-800 px-0 py-4 sticky top-0 z-50 shadow-md w-full">
      <div className="w-full flex justify-between items-center px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-lg text-white hover:text-purple-300 transition-colors"
        >
          <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-md">
            GDPR
          </span>
          Scanner
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-2 items-center">
          {visibleLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-sm font-bold text-white border border-transparent bg-purple-600 hover:bg-purple-700 hover:border-purple-400 px-4 py-2 rounded-lg transition-all duration-200 focus:border-purple-300 active:border-purple-300"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-purple-600/20 transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-2 border-t border-gray-800 pt-3 px-6">
          {visibleLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-bold text-white border border-transparent bg-purple-600 hover:bg-purple-700 hover:border-purple-400 px-4 py-2.5 rounded-lg transition-all duration-200 text-center focus:border-purple-300 active:border-purple-300"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}