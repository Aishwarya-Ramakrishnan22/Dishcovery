const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
  strYoutube?: string;
  strSource?: string;
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
  strMeasure6?: string;
  strMeasure7?: string;
  strMeasure8?: string;
  strMeasure9?: string;
  strMeasure10?: string;
  strMeasure11?: string;
  strMeasure12?: string;
  strMeasure13?: string;
  strMeasure14?: string;
  strMeasure15?: string;
  strMeasure16?: string;
  strMeasure17?: string;
  strMeasure18?: string;
  strMeasure19?: string;
  strMeasure20?: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strIngredient6?: string;
  strIngredient7?: string;
  strIngredient8?: string;
  strIngredient9?: string;
  strIngredient10?: string;
  strIngredient11?: string;
  strIngredient12?: string;
  strIngredient13?: string;
  strIngredient14?: string;
  strIngredient15?: string;
  strIngredient16?: string;
  strIngredient17?: string;
  strIngredient18?: string;
  strIngredient19?: string;
  strIngredient20?: string;
  [key: string]: string | undefined;
}

export interface ApiResponse {
  meals: Meal[] | null;
}

export interface Ingredient {
  idIngredient: string;
  strIngredient: string;
  strDescription?: string;
  strType?: string;
}

export interface IngredientListResponse {
  meals: { strIngredient: string }[] | null;
}

// Fetch all ingredients
export const fetchAllIngredients = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/list.php?i=list`);
    const data: IngredientListResponse = await response.json();
    return data.meals ? data.meals.map((item) => item.strIngredient) : [];
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    return [];
  }
};

// Filter meals by a single ingredient
export const filterMealsByIngredient = async (
  ingredient: string
): Promise<Meal[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`
    );
    const data: ApiResponse = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error(`Error filtering meals by ${ingredient}:`, error);
    return [];
  }
};

// Get full meal details by ID
export const getMealById = async (id: string): Promise<Meal | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/lookup.php?i=${id}`);
    const data: ApiResponse = await response.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error(`Error fetching meal ${id}:`, error);
    return null;
  }
};

// Get meals that match multiple ingredients
export const filterMealsByMultipleIngredients = async (
  ingredients: string[]
): Promise<Meal[]> => {
  if (ingredients.length === 0) return [];

  try {
    // Fetch meals for each ingredient
    const allMealsArrays = await Promise.all(
      ingredients.map((ingredient) => filterMealsByIngredient(ingredient))
    );

    // Create a map to count how many selected ingredients each meal contains
    const mealMatchCount = new Map<string, { meal: Meal; count: number }>();

    allMealsArrays.forEach((meals) => {
      meals.forEach((meal) => {
        if (mealMatchCount.has(meal.idMeal)) {
          const existing = mealMatchCount.get(meal.idMeal)!;
          existing.count += 1;
        } else {
          mealMatchCount.set(meal.idMeal, { meal, count: 1 });
        }
      });
    });

    // Convert to array and sort by match count (descending)
    const rankedMeals = Array.from(mealMatchCount.values())
      .sort((a, b) => b.count - a.count)
      .map((item) => item.meal);

    return rankedMeals;
  } catch (error) {
    console.error("Error filtering meals by multiple ingredients:", error);
    return [];
  }
};

// Calculate match score for a meal based on selected ingredients
export const calculateMatchScore = async (
  mealId: string,
  selectedIngredients: string[]
): Promise<number> => {
  const meal = await getMealById(mealId);
  if (!meal) return 0;

  const mealIngredients: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient && ingredient.trim()) {
      mealIngredients.push(ingredient.toLowerCase().trim());
    }
  }

  const selectedLower = selectedIngredients.map((ing) =>
    ing.toLowerCase().trim()
  );
  const matchCount = mealIngredients.filter((ing) =>
    selectedLower.some((selected) => ing.includes(selected))
  ).length;

  return mealIngredients.length > 0
    ? (matchCount / mealIngredients.length) * 100
    : 0;
};
