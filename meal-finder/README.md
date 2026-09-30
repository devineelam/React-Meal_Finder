# Meal Finder

A 3-page React app built on [TheMealDB API](https://www.themealdb.com/api.php):

1. **Home** – hero image, search bar, hamburger menu, categories grid
2. **Category / Search results** – a category's description + its meals, or search matches
3. **Meal Details** – full recipe: ingredients, measures, instructions, tags, source

## Project structure

```
meal-finder/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx                     # React entry point
    ├── App.jsx                      # routes
    ├── index.css                    # Tailwind
    ├── api/
    │   ├── rateLimiter.js           # queue-based API rate limiter
    │   └── mealApi.js               # all TheMealDB calls + caching
    ├── context/
    │   └── CategoriesContext.jsx    # fetches categories.php once, shares it
    ├── data/
    │   └── categoryImages.js        # maps category name -> local icon
    ├── assets/images/               # your bundled category icons + header photo
    ├── components/
    │   ├── Navbar.jsx
    │   ├── HamburgerMenu.jsx
    │   ├── Hero.jsx                 # header image + search bar
    │   ├── CategoryCard.jsx
    │   ├── CategoryGrid.jsx
    │   ├── MealCard.jsx
    │   ├── MealGrid.jsx
    │   └── Loader.jsx
    └── pages/
        ├── Home.jsx                 # page 1
        ├── CategoryMeals.jsx        # page 2 (category click)
        ├── SearchResults.jsx        # page 2 (search)
        └── MealDetails.jsx          # page 3
```

## How each requirement maps to the code

- **Navbar + hamburger** → `components/Navbar.jsx` + `components/HamburgerMenu.jsx`. The
  hamburger fetches nothing itself — it reads categories from `CategoriesContext`, which
  loads `categories.php` exactly once for the whole app. Clicking a category closes the
  menu (`onClose()`) and navigates to `/category/:name`.
- **Home page categories grid** → `components/CategoryGrid.jsx`, using the same shared
  categories and your bundled PNG icons (`data/categoryImages.js`) so it looks exactly
  like your screenshots, with the orange name badge in the corner.
- **Clicking a category → page 2** → `pages/CategoryMeals.jsx`. It calls
  `filter.php?c=<category>` for the meal list, and separately looks up the matching
  category's description text from the categories list already in context (`filter.php`
  itself doesn't return a description, only `categories.php` does).
- **Search bar → page 2 (search results)** → `pages/SearchResults.jsx`, calling
  `search.php?s=<term>`. Since `search.php` returns full meal objects (category + area
  included), the cards there show the little category badge + cuisine text, matching your
  7th screenshot. `filter.php` results (category page) don't include that data, so those
  cards are plainer — matching your 5th screenshot.
- **Clicking a meal → page 3** → `pages/MealDetails.jsx`, calling
  `lookup.php?i=<id>`. Ingredients/measures are pulled out of the 20 numbered
  `strIngredientN` / `strMeasureN` fields with `extractIngredients()` in `api/mealApi.js`.
  Categories grid is repeated at the bottom, same as your 6th screenshot.
- **Logo click → home** → the "MEAL FINDER" logo in `Navbar.jsx` is just a `<Link to="/">`.
- **Rate limiting** → `api/rateLimiter.js`. Every fetch to TheMealDB goes through a shared
  queue that only lets 5 requests fire per second and enforces at least 150ms between
  any two requests, no matter how fast the user clicks/types. `api/mealApi.js` also
  caches every response in memory, so revisiting a category or meal never re-hits the
  API at all.
- **Icons** → [`react-icons`](https://react-icons.github.io/react-icons/) (Font Awesome set):
  `FaBars`, `FaTimes`, `FaSearch`, `FaHome`, `FaChevronRight`, `FaCheckSquare`, `FaTools`.
- **Styling framework** → [Tailwind CSS](https://tailwindcss.com/).

## One small change from your screenshots

Image 6 shows what looks like a second "MEAL FINDER" navbar bar *inside* the details
card. I kept a single sticky navbar at the top of the whole app (standard practice, and
avoids two hamburger buttons on one page) instead of duplicating it inside the card.
Everything else — breadcrumb, ingredients box, measures, instructions, categories grid —
is built to match.

## How to run it

You need [Node.js](https://nodejs.org/) 18+ installed.

1. Unzip this project (or copy the `meal-finder` folder) somewhere on your machine.
2. Open a terminal in the `meal-finder` folder.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the dev server:

   ```bash
   npm run dev
   ```

5. Open the URL it prints — by default **http://localhost:3000**.

No API key or `.env` file is needed — TheMealDB's test endpoints (`www.themealdb.com/api/json/v1/1/...`)
are free and public.

### Building for production

```bash
npm run build     # outputs to dist/
npm run preview   # serve the production build locally to check it
```

## If you'd rather build it into your existing VS Code project

Your screenshot shows an existing `React pro` project with `App.jsx`, `main.jsx`, etc.
already in `src/`. Easiest path:

1. Copy the `src/` folder from this project **over** your existing `src/` folder
   (back up your old one first if you want to keep anything).
2. Copy `tailwind.config.js` and `postcss.config.js` into your project root.
3. Add the same dependencies to your existing `package.json`, then run:

   ```bash
   npm install react-router-dom react-icons
   npm install -D tailwindcss postcss autoprefixer
   ```

4. Make sure `src/index.css` has the three `@tailwind` lines at the top (see this
   project's `index.css`), and that it's imported in `main.jsx`.
5. Replace `App.jsx` and `main.jsx` with the ones from this project (or merge them).
6. `npm run dev` as usual.
