import { useNavigate } from "react-router-dom";
import Banner from "../assets/Banner.jpg";
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
              src={Banner}
              alt="Ingredients on a table"
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
