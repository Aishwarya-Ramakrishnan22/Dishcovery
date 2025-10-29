# 🍽️ Dishcovery

**Turn Your Ingredients Into Delicious Meals**

Dishcovery is a modern recipe discovery application that helps you find amazing recipes based on the ingredients you have in your kitchen. Simply select your available ingredients, and we'll suggest delicious meals you can make right now!

## ✨ Features

- 🔍 **Ingredient-Based Search**: Select from categorized ingredients (Vegetables, Fruits, Proteins, Dairy, Grains)
- 📊 **Smart Recipe Ranking**: Recipes are ranked by how many of your selected ingredients they use
- 📱 **Responsive Design**: Beautiful glassmorphism UI that works seamlessly on desktop and mobile
- 🌙 **Dark Mode**: Sleek dark theme for comfortable viewing
- 📹 **Video Tutorials**: Direct links to YouTube cooking tutorials
- 📖 **Detailed Instructions**: Step-by-step cooking instructions with ingredient lists
- 🎨 **Modern UI/UX**: iOS-inspired design with smooth animations and transitions

## 🚀 Tech Stack

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **State Management**: Zustand
- **API**: TheMealDB API
- **Styling**: CSS3 with Glassmorphism effects
- **Package Manager**: Bun

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Aishwarya-Ramakrishnan22/Dishcovery.git
   cd Dishcovery
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Start the development server**

   ```bash
   bun run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
Dishcovery/
├── src/
│   ├── components/
│   │   ├── HomeScreen.tsx          # Landing page
│   │   ├── IngredientsPage.tsx     # Ingredient selection
│   │   ├── RecipesPage.tsx         # Recipe results
│   │   ├── RecipeDetailPage.tsx    # Recipe details view
│   │   └── Navigation.tsx          # App navigation bar
│   ├── services/
│   │   └── mealApi.ts              # TheMealDB API integration
│   ├── store/
│   │   └── useStore.ts             # Zustand state management
│   ├── App.tsx                     # Main app component
│   └── main.tsx                    # App entry point
├── public/                         # Static assets
└── index.html                      # HTML template
```

## 🎯 Usage

1. **Home Screen**: Start by clicking "Find Recipe" button
2. **Select Ingredients**: Choose ingredients from 5 categories (initially showing 4 per category)
3. **View Recipes**: Browse recipes ranked by ingredient match percentage
4. **Recipe Details**: Click on any recipe to view:
   - Full ingredient list with images
   - Step-by-step instructions
   - Video tutorial (if available)
   - Link to original recipe

## 🎨 Design Features

- **Glassmorphism**: Frosted glass effect with backdrop blur
- **Smooth Animations**: Cubic-bezier transitions for all interactions
- **iOS-Inspired**: Clean, modern design following Apple's design principles
- **Accessibility**: Focus states and keyboard navigation support
- **Performance**: Optimized with lazy loading and efficient state management

## 🔧 Available Scripts

```bash
# Development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Lint code
bun run lint
```

## 🌐 API

This project uses [TheMealDB API](https://www.themealdb.com/api.php) for recipe data:

- Free tier with 100+ recipes
- Ingredient images and details
- Recipe instructions and videos
- Category and area filters

## 📱 Responsive Breakpoints

- **Desktop**: > 768px
- **Tablet**: 481px - 768px
- **Mobile**: < 480px

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Aishwarya Ramakrishnan**

- GitHub: [@Aishwarya-Ramakrishnan22](https://github.com/Aishwarya-Ramakrishnan22)

## 🙏 Acknowledgments

- Recipe data provided by [TheMealDB](https://www.themealdb.com/)
- Design inspiration from iOS and modern web applications
- Built with ❤️ using React and TypeScript

---

**Made with 🍳 by Aishwarya Ramakrishnan**
