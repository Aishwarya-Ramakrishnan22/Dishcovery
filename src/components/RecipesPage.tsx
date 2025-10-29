import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import { getMealById } from "../services/mealApi";
import ThemeToggle from "./ThemeToggle";
import "./RecipesPage.css";

interface MealWithScore {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
  matchScore: number;
  matchCount: number;
  totalIngredients: number;
}

const RecipesPage = () => {
  const navigate = useNavigate();
  const { meals, selectedIngredients } = useStore();
  const [rankedMeals, setRankedMeals] = useState<MealWithScore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const calculateScores = async () => {
      setLoading(true);
      const selectedArray = Array.from(selectedIngredients);

      const mealsWithScores = await Promise.all(
        meals.map(async (meal) => {
          const fullMeal = await getMealById(meal.idMeal);
          if (!fullMeal) {
            return {
              ...meal,
              matchScore: 0,
              matchCount: 0,
              totalIngredients: 0,
            };
          }

          const mealIngredients: string[] = [];
          for (let i = 1; i <= 20; i++) {
            const ingredient = fullMeal[`strIngredient${i}`];
            if (ingredient && ingredient.trim()) {
              mealIngredients.push(ingredient.toLowerCase().trim());
            }
          }

          const selectedLower = selectedArray.map((ing) =>
            ing.toLowerCase().trim()
          );
          const matchCount = mealIngredients.filter((ing) =>
            selectedLower.some(
              (selected) => ing.includes(selected) || selected.includes(ing)
            )
          ).length;

          const matchScore =
            mealIngredients.length > 0
              ? (matchCount / mealIngredients.length) * 100
              : 0;

          return {
            ...meal,
            matchScore,
            matchCount,
            totalIngredients: mealIngredients.length,
          };
        })
      );

      // Sort by match score (descending), then by match count
      const sorted = mealsWithScores.sort((a, b) => {
        if (b.matchScore !== a.matchScore) {
          return b.matchScore - a.matchScore;
        }
        return b.matchCount - a.matchCount;
      });

      setRankedMeals(sorted);
      setLoading(false);
    };

    if (meals.length > 0) {
      calculateScores();
    } else {
      setLoading(false);
    }
  }, [meals, selectedIngredients]);

  const getMatchBadgeColor = (score: number) => {
    if (score >= 80) return "#00d084"; // Green
    if (score >= 50) return "#ff9500"; // Orange
    return "#007aff"; // Blue
  };

  const handleRecipeClick = (mealId: string) => {
    navigate(`/recipe/${mealId}`);
  };

  return (
    <div className="recipes-page">
      <ThemeToggle />
      <div className="recipes-header">
        <button
          className="back-button"
          onClick={() => navigate("/ingredients")}
        >
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
        <h1 className="recipes-title">Recipes for You</h1>
      </div>

      <div className="recipes-content">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Finding perfect recipes...</p>
          </div>
        ) : rankedMeals.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">🍽️</span>
            <p className="empty-text">No recipes found</p>
            <p className="empty-subtext">Try selecting different ingredients</p>
          </div>
        ) : (
          <div className="recipes-grid">
            {rankedMeals.map((meal) => (
              <div
                key={meal.idMeal}
                className="recipe-card"
                onClick={() => handleRecipeClick(meal.idMeal)}
              >
                <div className="recipe-image-container">
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="recipe-image"
                  />
                  <div
                    className="match-badge"
                    style={{
                      backgroundColor: getMatchBadgeColor(meal.matchScore),
                    }}
                  >
                    {Math.round(meal.matchScore)}% Match
                  </div>
                </div>
                <div className="recipe-info">
                  <h3 className="recipe-name">{meal.strMeal}</h3>
                  <div className="recipe-meta">
                    {meal.strCategory && (
                      <span className="recipe-category">
                        <span className="meta-icon">🍴</span>
                        {meal.strCategory}
                      </span>
                    )}
                    {meal.strArea && (
                      <span className="recipe-area">
                        <span className="meta-icon">🌍</span>
                        {meal.strArea}
                      </span>
                    )}
                  </div>
                  <div className="recipe-match-info">
                    <span className="match-count">
                      {meal.matchCount} of {meal.totalIngredients} ingredients
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipesPage;
