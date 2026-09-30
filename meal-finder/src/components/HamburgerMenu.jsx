import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { useCategories } from "../context/CategoriesContext";

export default function HamburgerMenu({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { categories } = useCategories();

  const handleSelect = (categoryName) => {
    navigate(`/category/${encodeURIComponent(categoryName)}`);
    onClose(); // closes as soon as an item is clicked, per spec
  };

  return (
    <>
      {/* dark backdrop, click to close */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* slide-in panel */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 sm:w-80 bg-white z-50 shadow-2xl
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="text-orange-600 text-2xl hover:opacity-70"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="px-6">
          <ul>
            {categories.map((cat) => (
              <li key={cat.idCategory} className="border-b border-gray-200">
                <button
                  onClick={() => handleSelect(cat.strCategory)}
                  className="w-full text-left py-3 text-gray-700 hover:text-orange-600 transition"
                >
                  {cat.strCategory}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
