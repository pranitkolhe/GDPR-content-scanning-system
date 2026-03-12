import { useState } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Scan from "./pages/Scan";
import Dashboard from "./pages/Dashboard";
import Rules from "./pages/Rules";
import Violations from "./pages/Violations";

function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-gray-950/95 backdrop-blur-md border-b border-white/[0.06]">
        <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 font-bold text-sm text-white tracking-tight no-underline flex-shrink-0"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.8)]" />
            GDPR Scanner
          </Link>

          {/* Desktop Links */}
          <div className="hidden sm:flex items-center gap-2">

            {!isActive("/") && (
              <Link
                to="/"
                className="text-sm font-bold text-white px-3.5 py-1.5 rounded-md transition-all duration-200 no-underline hover:bg-white/[0.06]"
              >
                Home
              </Link>
            )}

            {!isActive("/dashboard") && (
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-white px-4 py-1.5 rounded-lg border border-white/20 hover:border-white/40 bg-transparent hover:bg-white/[0.06] transition-all duration-200 no-underline hover:-translate-y-0.5"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                  <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
                </svg>
                Dashboard
              </Link>
            )}

            {!isActive("/scan") && (
              <Link
                to="/scan"
                className="ml-1 inline-flex items-center gap-1.5 text-sm font-bold text-white px-4 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 shadow-lg shadow-violet-900/40 hover:shadow-violet-800/50 transition-all duration-200 no-underline hover:-translate-y-0.5"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                Start Scan
              </Link>
            )}

            {!isActive("/rules") && (
              <Link
                to="/rules"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2 text-sm font-bold text-white px-4 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 shadow-lg shadow-violet-900/40 transition-all duration-200 no-underline"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                Rules
              </Link>
            )}

          </div>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden flex items-center justify-center w-8 h-8 rounded-md hover:bg-white/10 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M3 12h18M3 6h18M3 18h18"/>
              </svg>
            )}
          </button>

        </div>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-gray-950/98 backdrop-blur-md border-b border-white/[0.06] sm:hidden">
          <div className="flex flex-col px-4 py-4 gap-2">

            {!isActive("/") && (
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-bold text-white px-4 py-2.5 rounded-lg hover:bg-white/[0.06] transition-all duration-200 no-underline"
              >
                Home
              </Link>
            )}

            {!isActive("/dashboard") && (
              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center gap-2 text-sm font-bold text-white px-4 py-2.5 rounded-lg border border-white/20 hover:border-white/40 bg-transparent hover:bg-white/[0.06] transition-all duration-200 no-underline"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                  <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
                </svg>
                Dashboard
              </Link>
            )}

            {!isActive("/scan") && (
              <Link
                to="/scan"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2 text-sm font-bold text-white px-4 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 shadow-lg shadow-violet-900/40 transition-all duration-200 no-underline"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                Start Scan
              </Link>
            )}

            {!isActive("/rules") && (
              <Link
                to="/rules"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2 text-sm font-bold text-white px-4 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 shadow-lg shadow-violet-900/40 transition-all duration-200 no-underline"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                Rules
              </Link>
            )}

          </div>
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="pt-16 min-h-screen">
        <Routes>
          <Route path="/"          element={<Home />} />
          <Route path="/scan"      element={<Scan />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/rules"     element={<Rules />} />
          <Route path="//scan/:id" element={<Violations />}/>

        </Routes>
      </div>
    </BrowserRouter>
  );
}