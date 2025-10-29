import { create } from "zustand";
import type { Meal } from "../services/mealApi";

interface AppState {
  selectedIngredients: Set<string>;
  availableIngredients: string[];
  meals: Meal[];
  loading: boolean;
  error: string | null;

  // Actions
  toggleIngredient: (ingredient: string) => void;
  setAvailableIngredients: (ingredients: string[]) => void;
  setMeals: (meals: Meal[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearSelectedIngredients: () => void;
}

export const useStore = create<AppState>((set) => ({
  selectedIngredients: new Set<string>(),
  availableIngredients: [],
  meals: [],
  loading: false,
  error: null,

  toggleIngredient: (ingredient: string) =>
    set((state) => {
      const newSelected = new Set(state.selectedIngredients);
      if (newSelected.has(ingredient)) {
        newSelected.delete(ingredient);
      } else {
        newSelected.add(ingredient);
      }
      return { selectedIngredients: newSelected };
    }),

  setAvailableIngredients: (ingredients: string[]) =>
    set({ availableIngredients: ingredients }),

  setMeals: (meals: Meal[]) => set({ meals }),

  setLoading: (loading: boolean) => set({ loading }),

  setError: (error: string | null) => set({ error }),

  clearSelectedIngredients: () => set({ selectedIngredients: new Set() }),
}));
