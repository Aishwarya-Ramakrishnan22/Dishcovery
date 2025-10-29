import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import {
  fetchAllIngredients,
  filterMealsByMultipleIngredients,
} from "../services/mealApi";
import ThemeToggle from "./ThemeToggle";
import "./IngredientsPage.css";

const IngredientsPage = () => {
  const navigate = useNavigate();
  const {
    selectedIngredients,
    toggleIngredient,
    setMeals,
    setLoading,
    availableIngredients,
    setAvailableIngredients,
  } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [localLoading, setLocalLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );

  const INITIAL_DISPLAY_COUNT = 4;

  useEffect(() => {
    const loadIngredients = async () => {
      setLocalLoading(true);
      const ingredients = await fetchAllIngredients();
      setAvailableIngredients(ingredients);
      setLocalLoading(false);
    };
    loadIngredients();
  }, [setAvailableIngredients]);

  const toggleCategoryExpanded = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const getIngredientImageUrl = (ingredientName: string) => {
    // Format ingredient name for URL (replace spaces with underscores, handle special cases)
    const formattedName = ingredientName
      .toLowerCase()
      .trim()
      .replace(/ /g, "_")
      .replace(/'/g, "");
    return `https://www.themealdb.com/images/ingredients/${formattedName}.png`;
  };

  const handleFindRecipes = async () => {
    if (selectedIngredients.size === 0) return;

    setLoading(true);
    const ingredientsArray = Array.from(selectedIngredients);
    const meals = await filterMealsByMultipleIngredients(ingredientsArray);
    setMeals(meals);
    setLoading(false);
    navigate("/recipes");
  };

  const categorizeIngredients = () => {
    const vegetables = [
      "Tomatoes",
      "Carrots",
      "Spinach",
      "Broccoli",
      "Onions",
      "Garlic",
      "Potatoes",
      "Lettuce",
      "Cucumber",
      "Bell Pepper",
      "Celery",
      "Mushrooms",
      "Zucchini",
      "Eggplant",
      "Cabbage",
    ];
    const fruits = [
      "Apples",
      "Bananas",
      "Oranges",
      "Lemon",
      "Lime",
      "Strawberries",
      "Blueberries",
      "Mango",
      "Pineapple",
      "Grapes",
    ];
    const proteins = [
      "Chicken",
      "Beef",
      "Pork",
      "Lamb",
      "Salmon",
      "Tuna",
      "Cod",
      "Eggs",
      "Tofu",
      "Bacon",
    ];
    const dairy = ["Milk", "Cheese", "Butter", "Cream", "Yogurt", "Parmesan"];
    const grains = [
      "Rice",
      "Pasta",
      "Bread",
      "Flour",
      "Oats",
      "Quinoa",
      "Couscous",
    ];

    return [
      {
        id: "vegetables",
        name: "Vegetables",
        icon: "🥕",
        iconBg: "rgba(255, 107, 107, 0.15)",
        ingredients: availableIngredients.filter((ing) =>
          vegetables.some((v) => ing.toLowerCase().includes(v.toLowerCase()))
        ),
      },
      {
        id: "fruits",
        name: "Fruits",
        icon: "🍎",
        iconBg: "rgba(255, 0, 110, 0.15)",
        ingredients: availableIngredients.filter((ing) =>
          fruits.some((f) => ing.toLowerCase().includes(f.toLowerCase()))
        ),
      },
      {
        id: "proteins",
        name: "Proteins",
        icon: "🍖",
        iconBg: "rgba(255, 107, 53, 0.15)",
        ingredients: availableIngredients.filter((ing) =>
          proteins.some((p) => ing.toLowerCase().includes(p.toLowerCase()))
        ),
      },
      {
        id: "dairy",
        name: "Dairy",
        icon: "🥛",
        iconBg: "rgba(76, 201, 240, 0.15)",
        ingredients: availableIngredients.filter((ing) =>
          dairy.some((d) => ing.toLowerCase().includes(d.toLowerCase()))
        ),
      },
      {
        id: "grains",
        name: "Grains & Starches",
        icon: "🌾",
        iconBg: "rgba(247, 147, 30, 0.15)",
        ingredients: availableIngredients.filter((ing) =>
          grains.some((g) => ing.toLowerCase().includes(g.toLowerCase()))
        ),
      },
    ];
  };

  const categories = categorizeIngredients();

  const filteredCategories = categories
    .map((category) => ({
      ...category,
      ingredients: category.ingredients.filter((ingredient) =>
        ingredient.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.ingredients.length > 0);

  return (
    <div className="ingredients-page">
      <ThemeToggle />
      <div className="search-header">
        <button className="back-button" onClick={() => navigate("/")}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 12H5M5 12L12 19M5 12L12 5"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="search-container">
          <svg
            className="search-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="text"
            placeholder="Search ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="ingredients-content">
        {localLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading ingredients...</p>
          </div>
        ) : (
          <>
            {filteredCategories.map((category) => {
              const isExpanded = expandedCategories.has(category.id);
              const displayedIngredients = isExpanded
                ? category.ingredients
                : category.ingredients.slice(0, INITIAL_DISPLAY_COUNT);
              const hasMore =
                category.ingredients.length > INITIAL_DISPLAY_COUNT;

              return (
                <div key={category.id} className="category-section">
                  <div className="category-header">
                    <div
                      className="category-icon"
                      style={{ background: category.iconBg }}
                    >
                      <span>{category.icon}</span>
                    </div>
                    <h2 className="category-title">{category.name}</h2>
                    <span className="category-count">
                      ({category.ingredients.length})
                    </span>
                  </div>

                  <div className="ingredients-grid">
                    {displayedIngredients.map((ingredient) => (
                      <button
                        key={ingredient}
                        className={`ingredient-card ${
                          selectedIngredients.has(ingredient) ? "selected" : ""
                        }`}
                        onClick={() => toggleIngredient(ingredient)}
                      >
                        <div className="ingredient-image-container">
                          <img
                            src={getIngredientImageUrl(ingredient)}
                            alt={ingredient}
                            className="ingredient-image"
                            onError={(e) => {
                              // Fallback to emoji if image fails to load
                              e.currentTarget.style.display = "none";
                              const parent = e.currentTarget.parentElement;
                              if (parent) {
                                parent.innerHTML = `<span class="ingredient-emoji-fallback">${category.icon}</span>`;
                              }
                            }}
                          />
                        </div>
                        <span className="ingredient-name">{ingredient}</span>
                        {selectedIngredients.has(ingredient) && (
                          <div className="check-mark">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M20 6L9 17L4 12"
                                stroke="white"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        )}
                      </button>
                    ))}

                    {hasMore && !isExpanded && (
                      <button
                        className="show-more-card"
                        onClick={() => toggleCategoryExpanded(category.id)}
                      >
                        <div className="show-more-icon">
                          <svg
                            width="40"
                            height="40"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 5V19M5 12H19"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <span className="show-more-text">Show More</span>
                        <span className="show-more-count">
                          +{category.ingredients.length - INITIAL_DISPLAY_COUNT}
                        </span>
                      </button>
                    )}
                  </div>

                  {hasMore && isExpanded && (
                    <button
                      className="show-less-btn"
                      onClick={() => toggleCategoryExpanded(category.id)}
                    >
                      <span>Show Less</span>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18 15L12 9L6 15"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>

      {selectedIngredients.size > 0 && (
        <div className="find-recipes-footer">
          <button className="find-recipes-btn" onClick={handleFindRecipes}>
            Find Recipes ({selectedIngredients.size} ingredient
            {selectedIngredients.size !== 1 ? "s" : ""})
          </button>
        </div>
      )}
    </div>
  );
};

export default IngredientsPage;
