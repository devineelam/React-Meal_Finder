import { mealDbLimiter } from "./rateLimiter";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// In-memory cache so navigating back to a category / meal we already
// fetched doesn't cost another API call (or another slot in the queue).
const cache = new Map();

async function rateLimitedFetch(url) {
  if (cache.has(url)) {
    return cache.get(url);
  }

  const data = await mealDbLimiter.schedule(async () => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }
    return res.json();
  });

  cache.set(url, data);
  return data;
}

// 1. All categories -> used for the hamburger menu + CATEGORIES grid
export async function getCategories() {
  const data = await rateLimitedFetch(`${BASE_URL}/categories.php`);
  return data.categories || [];
}

// 2. Search meals by name -> used by the search bar
export async function searchMealsByName(name) {
  const data = await rateLimitedFetch(
    `${BASE_URL}/search.php?s=${encodeURIComponent(name)}`
  );
  return data.meals || [];
}

// 3. Meal details by id -> used by the Meal Details page
export async function getMealById(id) {
  const data = await rateLimitedFetch(
    `${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`
  );
  return data.meals ? data.meals[0] : null;
}

// 4. Filter meals by category -> used by the Category page
export async function getMealsByCategory(category) {
  const data = await rateLimitedFetch(
    `${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`
  );
  return data.meals || [];
}

// TheMealDB stores each ingredient/measure as separate numbered fields
// (strIngredient1..20 / strMeasure1..20). This turns that into a clean array.
export function extractIngredients(meal) {
  if (!meal) return [];
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure ? measure.trim() : "",
      });
    }
  }
  return ingredients;
}
