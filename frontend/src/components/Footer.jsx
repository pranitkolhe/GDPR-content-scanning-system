import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 px-6 py-8 mt-auto">
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
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

        {/* Copyright */}
        <p className="text-xs text-gray-500">
          &copy; {new Date().getFullYear()} GDPR Scanner. All rights reserved.
        </p>
      </div>
    </footer>
  );
}