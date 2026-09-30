import MealCard from "./MealCard";

export default function MealGrid({ meals }) {
  if (!meals || meals.length === 0) {
    return <p className="text-gray-500">No meals found. Try a different search.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
      {meals.map((meal) => (
        <MealCard key={meal.idMeal} meal={meal} />
      ))}
    </div>
  );
}
