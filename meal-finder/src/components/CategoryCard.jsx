import { Link } from "react-router-dom";
import { getCategoryImage } from "../data/categoryImages";

export default function CategoryCard({ category }) {
  const image = getCategoryImage(category.strCategory, category.strCategoryThumb);

  return (
    <Link
      to={`/category/${encodeURIComponent(category.strCategory)}`}
      className="relative block bg-white shadow hover:shadow-lg overflow-hidden transition"
    >
      <img
        src={image}
        alt={category.strCategory}
        className="w-full h-40 sm:h-44 object-cover"
      />
      <span className="absolute top-3 right-3 bg-orange-600 text-white text-xs font-semibold tracking-wide px-3 py-1 uppercase">
        {category.strCategory}
      </span>
    </Link>
  );
}
