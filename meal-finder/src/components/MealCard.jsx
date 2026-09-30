import { Link } from "react-router-dom";

export default function MealCard({ meal }) {
  return (
    <Link
      to={`/meal/${meal.idMeal}`}
      className="block bg-white shadow hover:shadow-lg overflow-hidden transition"
    >
      <div className="relative">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-40 object-cover"
        />

        {/* strCategory only exists on full objects returned by search.php,
            not on the lightweight objects returned by filter.php */}
        {meal.strCategory && (
          <span className="absolute top-3 left-3 bg-white text-orange-600 text-xs font-semibold px-3 py-1 rounded-full shadow">
            {meal.strCategory}
          </span>
        )}
      </div>

      <div className="p-4">
        {meal.strArea && (
          <p className="text-gray-400 text-sm mb-1">{meal.strArea}</p>
        )}
        <h3 className="font-bold text-gray-800 leading-snug">{meal.strMeal}</h3>
      </div>
    </Link>
  );
}
