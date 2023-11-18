import React from "react";
import AppHeader from "../app-header/app-header.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import ingredientsData from "../../utils/data.json";

function App() {
  const selectedIngredients = [
    "60666c42cc7b410027a1a9b1",
    "60666c42cc7b410027a1a9b9",
    "60666c42cc7b410027a1a9bc",
    "60666c42cc7b410027a1a9bb",
    "60666c42cc7b410027a1a9bb",
    "60666c42cc7b410027a1a9b5",
    "60666c42cc7b410027a1a9b6",
    "60666c42cc7b410027a1a9bf",
    "60666c42cc7b410027a1a9b3",
    "60666c42cc7b410027a1a9be",
  ];

  return (
    <React.Fragment>
      <AppHeader />
      <main className="main pl-5 pr-5">
        <BurgerIngredients
          ingredientsData={ingredientsData}
          selectedIngredients={selectedIngredients}
        />
        <BurgerConstructor
          ingredientsData={ingredientsData}
          selectedIngredients={selectedIngredients}
        />
      </main>
    </React.Fragment>
  );
}

export default App;
