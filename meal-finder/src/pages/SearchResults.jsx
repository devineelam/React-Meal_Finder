import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Hero from "../components/Hero";
import Loader from "../components/Loader";
import MealGrid from "../components/MealGrid";
import { searchMealsByName } from "../api/mealApi";

export default function SearchResults() {
  const { term } = useParams();

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    searchMealsByName(term)
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
  }, [term]);

  return (
    <>
      <Hero initialQuery={term} />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        <h2 className="text-2xl font-extrabold mb-1">MEALS</h2>
        <div className="w-14 h-1 bg-orange-600 mb-8" />

        {loading && <Loader />}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && <MealGrid meals={meals} />}
      </div>
    </>
  );
}
