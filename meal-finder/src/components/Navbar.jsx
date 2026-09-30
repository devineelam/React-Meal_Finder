import { Link } from "react-router-dom";
import { FaBars, FaUtensils } from "react-icons/fa";

export default function Navbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-40 bg-orange-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 py-4">
        <Link
          to="/"
          className="flex items-center gap-2 font-extrabold tracking-wide text-lg sm:text-xl"
        >
          <FaUtensils />
          MEAL FINDER
        </Link>

        <button
          onClick={onMenuClick}
          aria-label="Open categories menu"
          className="text-2xl p-2 hover:opacity-80 transition"
        >
          <FaBars />
        </button>
      </div>
    </header>
  );
}
