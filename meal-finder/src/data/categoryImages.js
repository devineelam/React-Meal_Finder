import beef from "../assets/images/beef.png";
import breakfast from "../assets/images/breakfast.png";
import chicken from "../assets/images/chicken.png";
import dessert from "../assets/images/dessert.png";
import goat from "../assets/images/goat.png";
import lamb from "../assets/images/lamb.png";
import miscellaneous from "../assets/images/miscellaneous.png";
import pasta from "../assets/images/pasta.png";
import pork from "../assets/images/pork.png";
import seafood from "../assets/images/seafood.png";
import side from "../assets/images/side.png";
import starter from "../assets/images/starter.png";
import vegan from "../assets/images/vegan.png";
import vegetarian from "../assets/images/vegetarian.png";

const categoryImages = {
  beef,
  breakfast,
  chicken,
  dessert,
  goat,
  lamb,
  miscellaneous,
  pasta,
  pork,
  seafood,
  side,
  starter,
  vegan,
  vegetarian,
};

// Falls back to the image TheMealDB API itself provides (strCategoryThumb)
// if a category ever shows up that we don't have a local icon for.
export function getCategoryImage(categoryName, fallback) {
  const key = categoryName.toLowerCase();
  return categoryImages[key] || fallback || "";
}

export default categoryImages;
