import React from "react";
import AppHeader from "../app-header/app-header.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import ingredientsData from "../../utils/data.json";
import selectedIngredients from "../../utils/selectedIngredients.json";

function App() {
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
