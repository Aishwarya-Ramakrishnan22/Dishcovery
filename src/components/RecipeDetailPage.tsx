import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMealById } from "../services/mealApi";
import type { Meal } from "../services/mealApi";
import ThemeToggle from "./ThemeToggle";
import "./RecipeDetailPage.css";

const RecipeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMeal = async () => {
      if (!id) return;
      setLoading(true);
      const mealData = await getMealById(id);
      setMeal(mealData);
      setLoading(false);
    };
    loadMeal();
  }, [id]);

  const getIngredients = () => {
    if (!meal) return [];
    const ingredients: { name: string; measure: string }[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          name: ingredient,
          measure: measure || "",
        });
      }
    }
    return ingredients;
  };

  const getIngredientImageUrl = (ingredientName: string) => {
    const formattedName = ingredientName
      .toLowerCase()
      .trim()
      .replace(/ /g, "_")
      .replace(/'/g, "");
    return `https://www.themealdb.com/images/ingredients/${formattedName}-small.png`;
  };

  const getInstructions = () => {
    if (!meal?.strInstructions) return [];
    // Split by newlines and filter out empty strings
    return meal.strInstructions
      .split(/\r?\n/)
      .filter((step) => step.trim().length > 0)
      .map((step, index) => ({
        number: index + 1,
        text: step.trim(),
      }));
  };

  if (loading) {
    return (
      <div className="recipe-detail-page">
        <ThemeToggle />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading recipe...</p>
        </div>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="recipe-detail-page">
        <ThemeToggle />
        <div className="empty-state">
          <span className="empty-icon">😕</span>
          <p className="empty-text">Recipe not found</p>
          <button className="back-btn" onClick={() => navigate("/recipes")}>
            Back to Recipes
          </button>
        </div>
      </div>
    );
  }

  const ingredients = getIngredients();
  const instructions = getInstructions();

  return (
    <div className="recipe-detail-page">
      <ThemeToggle />

      {/* Header */}
      <div className="detail-header">
        <button className="back-button" onClick={() => navigate("/recipes")}>
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
      </div>

      {/* Hero Section */}
      <div className="recipe-hero">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="hero-image"
        />
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="recipe-title">{meal.strMeal}</h1>
            <div className="recipe-tags">
              {meal.strCategory && (
                <span className="tag">
                  <span className="tag-icon">🍴</span>
                  {meal.strCategory}
                </span>
              )}
              {meal.strArea && (
                <span className="tag">
                  <span className="tag-icon">🌍</span>
                  {meal.strArea}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="detail-content">
        {/* Two Column Layout */}
        <div className="recipe-layout">
          {/* Instructions Section - Left */}
          <section className="detail-section instructions-section">
            <h2 className="section-title">
              <span className="section-icon">👨‍🍳</span>
              Instructions
            </h2>
            <div className="instructions-list">
              {instructions.map((step) => (
                <div key={step.number} className="instruction-step">
                  <div className="step-number">{step.number}</div>
                  <p className="step-text">{step.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Ingredients Section - Right */}
          <section className="detail-section ingredients-section">
            <h2 className="section-title">
              <span className="section-icon">🛒</span>
              Ingredients ({ingredients.length})
            </h2>
            <div className="ingredients-list">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="ingredient-item">
                  <div className="ingredient-image-wrapper">
                    <img
                      src={getIngredientImageUrl(ingredient.name)}
                      alt={ingredient.name}
                      className="ingredient-thumb"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                  <div className="ingredient-details">
                    <span className="ingredient-name">{ingredient.name}</span>
                    <span className="ingredient-measure">
                      {ingredient.measure}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Video Section (if available) */}
        {meal.strYoutube && (
          <section className="detail-section">
            <h2 className="section-title">
              <span className="section-icon">📹</span>
              Video Tutorial
            </h2>
            <div className="video-container">
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="video-link"
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 8L16 12L10 16V8Z" fill="currentColor" />
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                    fill="currentColor"
                  />
                </svg>
                <span>Watch on YouTube</span>
              </a>
            </div>
          </section>
        )}

        {/* Source Link (if available) */}
        {meal.strSource && (
          <section className="detail-section">
            <a
              href={meal.strSource}
              target="_blank"
              rel="noopener noreferrer"
              className="source-link"
            >
              View Original Recipe →
            </a>
          </section>
        )}
      </div>
    </div>
  );
};

export default RecipeDetailPage;
