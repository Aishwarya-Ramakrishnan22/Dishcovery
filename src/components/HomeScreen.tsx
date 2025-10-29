import { useNavigate } from "react-router-dom";
import "./HomeScreen.css";

const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="home-screen">
      <div className="hero-section">
        <h1 className="hero-title">
          Turn Your Ingredients Into
          <br />
          Delicious Meals
        </h1>
        <p className="hero-subtitle">
          Simply tell us what you have in your kitchen, and we'll suggest
          amazing recipes you can make right now.
        </p>

        <div className="image-container">
          <div className="image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1593197003664-249c70744f00?w=800"
              alt="Flour in a bowl"
              className="hero-image"
            />
          </div>
        </div>

        <button
          className="find-recipe-btn"
          onClick={() => navigate("/ingredients")}
        >
          Find Recipe
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
