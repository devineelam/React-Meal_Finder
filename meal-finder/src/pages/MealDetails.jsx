import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaHome, FaChevronRight, FaCheckSquare, FaTools } from "react-icons/fa";
import Hero from "../components/Hero";
import Loader from "../components/Loader";
import CategoryGrid from "../components/CategoryGrid";
import { getMealById, extractIngredients } from "../api/mealApi";

export default function MealDetails() {
  const { id } = useParams();

  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    setMeal(null);

    getMealById(id)
      .then((data) => {
        if (isMounted) setMeal(data);
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
  }, [id]);

  if (loading) {
    return (
      <>
        <Hero />
        <Loader />
      </>
    );
  }

  if (error || !meal) {
    return (
      <>
        <Hero />
        <p className="text-center text-red-600 py-10">
          {error || "Meal not found."}
        </p>
      </>
    );
  }

  const ingredients = extractIngredients(meal);
  const tags = meal.strTags ? meal.strTags.split(",").filter(Boolean) : [];
  const instructions = meal.strInstructions
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <>
      <Hero />

      
      <div className="bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center gap-2 text-sm">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80">
            <FaHome />
          </Link>
          <FaChevronRight className="text-xs opacity-80" />
          <span className="font-semibold uppercase tracking-wide">
            {meal.strMeal}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        <h2 className="text-2xl font-extrabold mb-1">MEAL DETAILS</h2>
        <div className="w-14 h-1 bg-orange-600 mb-8" />

        <div className="bg-white shadow rounded overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-full object-cover rounded"
            />

            <div>
              <h1 className="text-orange-600 text-2xl font-bold border-b-2 border-orange-500 inline-block pb-2 mb-4">
                {meal.strMeal}
              </h1>

              <p className="mb-1">
                <span className="font-semibold">CATEGORY:</span>{" "}
                {meal.strCategory}
              </p>

              {meal.strSource && (
                <p className="mb-1 break-all">
                  <span className="font-semibold">Source: </span>
                  <a
                    href={meal.strSource}
                    target="_blank"
                    rel="noreferrer"
                    className="text-orange-600 underline"
                  >
                    {meal.strSource}
                  </a>
                </p>
              )}

              {tags.length > 0 && (
                <div className="mb-4 mt-2">
                  <span className="font-semibold mr-2">Tags:</span>
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block border border-orange-500 text-orange-600 rounded px-2 py-0.5 text-xs mr-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="bg-orange-600 text-white rounded p-4 mt-4">
                <h3 className="font-bold mb-3">Ingredients</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                  {ingredients.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="bg-white text-orange-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span>{item.ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 pb-6">
            <h3 className="font-semibold mb-3">Measure:</h3>
            <div className="border border-gray-200 rounded p-4 grid sm:grid-cols-2 gap-2 mb-8">
              {ingredients.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <FaTools className="text-orange-500 flex-shrink-0" />
                  {item.measure || "-"}
                </div>
              ))}
            </div>

            <h3 className="font-semibold mb-3">Instructions:</h3>
            <ul className="space-y-2">
              {instructions.map((step, idx) => (
                <li key={idx} className="flex gap-2 text-sm text-gray-700">
                  <FaCheckSquare className="text-orange-500 mt-0.5 flex-shrink-0" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <CategoryGrid />
    </>
  );
}
