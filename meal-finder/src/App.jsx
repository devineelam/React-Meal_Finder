import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HamburgerMenu from "./components/HamburgerMenu";
import { CategoriesProvider } from "./context/CategoriesContext";
import Home from "./pages/Home";
import CategoryMeals from "./pages/CategoryMeals";
import SearchResults from "./pages/SearchResults";
import MealDetails from "./pages/MealDetails";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <CategoriesProvider>
      <Navbar onMenuClick={() => setMenuOpen(true)} />
      <HamburgerMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <Routes>
        
        <Route path="/" element={<Home />} />

        
        <Route path="/category/:categoryName" element={<CategoryMeals/>}/>
        <Route path="/search/:term" element={<SearchResults />} />

        
        <Route path="/meal/:id" element={<MealDetails />} />
      </Routes>
    </CategoriesProvider> 
  );
}