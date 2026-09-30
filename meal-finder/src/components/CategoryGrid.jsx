import CategoryCard from "./CategoryCard";
import Loader from "./Loader";
import { useCategories } from "../context/CategoriesContext";

export default function CategoryGrid() {
  const { categories, loading, error } = useCategories();

  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <h2 className="text-2xl font-extrabold mb-1">CATEGORIES</h2>
        <div className="w-14 h-1 bg-orange-600 mb-8" />

        {loading && <Loader />}
        {error && (
          <p className="text-red-600">Couldn't load categories: {error}</p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <CategoryCard key={cat.idCategory} category={cat} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
