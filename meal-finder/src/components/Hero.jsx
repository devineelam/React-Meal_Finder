import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import heroImage from "../assets/images/header_image.jpg";

export default function Hero({ initialQuery = "" }) {
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const term = query.trim();
    if (term) {
      navigate(`/search/${encodeURIComponent(term)}`);
    }
  };

  return (
    <section
      className="relative bg-cover bg-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative max-w-3xl mx-auto text-center px-4 py-20 sm:py-28">
        <form onSubmit={handleSubmit} className="flex justify-center gap-2 mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search recipes here ..."
            className="w-full max-w-md rounded-full px-5 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            aria-label="Search"
            className="bg-orange-600 hover:bg-orange-700 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 transition"
          >
            <FaSearch />
          </button>
        </form>

        <h1 className="text-white text-3xl sm:text-4xl font-extrabold mb-3 leading-tight">
          What are your favorite cuisines?
        </h1>
        <p className="text-gray-200 tracking-widest text-xs sm:text-sm">
          PERSONALIZE YOUR EXPERIENCE
        </p>
      </div>
    </section>
  );
}
