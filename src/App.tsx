import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import HomeScreen from "./components/HomeScreen";
import IngredientsPage from "./components/IngredientsPage";
import RecipesPage from "./components/RecipesPage";
import RecipeDetailPage from "./components/RecipeDetailPage";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navigation />
            <HomeScreen />
          </>
        }
      />
      <Route path="/ingredients" element={<IngredientsPage />} />
      <Route path="/recipes" element={<RecipesPage />} />
      <Route path="/recipe/:id" element={<RecipeDetailPage />} />
    </Routes>
  );
}

export default App;
