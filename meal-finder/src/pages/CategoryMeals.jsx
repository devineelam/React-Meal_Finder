import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Hero from "../components/Hero";
import Loader from "../components/Loader";
import MealGrid from "../components/MealGrid";
import { getMealsByCategory } from "../api/mealApi";
import { useCategories } from "../context/CategoriesContext";

export default function CategoryMeals() {
  const { categoryName } = useParams();
  const { categories } = useCategories();

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const categoryInfo = categories.find(
    (c) => c.strCategory.toLowerCase() === categoryName.toLowerCase()
  );

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    getMealsByCategory(categoryName)
      .then((data) => {
        if (isMounted) setMeals(data);
      })
      .catch((err) => {
        if (isMounted) setError(err.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [categoryName]);

  return (
    <>
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        {categoryInfo && (
          <div className="border border-orange-200 bg-orange-50 rounded p-6 mb-10">
            <h2 className="text-orange-600 text-xl font-bold mb-3">
              {categoryInfo.strCategory}
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              {categoryInfo.strCategoryDescription}
            </p>
          </div>
        )}

        <h2 className="text-2xl font-extrabold mb-1">MEALS</h2>
        <div className="w-14 h-1 bg-orange-600 mb-8" />

        {loading && <Loader />}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && <MealGrid meals={meals} />}
      </div>
    </>
  );
}
