import React from "react";
import AppHeader from "../app-header/app-header.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";

const url = "https://norma.nomoreparties.space";

function App() {
  const [ingredientsData, setIngredientsData] = React.useState([]);
  const [selectedIngredients, setSelectedIngredients] = React.useState([]);
  const [dataLoadingStatus, setDataLoadingStatus] = React.useState("loading");

  const generateRandomSelectedIngredients = (data) => {
    let selectedIds = [];
    let bun = data.find((item) => item.type === "bun");
    selectedIds.push(bun._id);
    selectedIds.push(bun._id);

    const getRandomInt = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    };

    let sauces = data
      .filter((item) => item.type === "sauce")
      .map((item) => item);

    let i = 1;
    while (i > 0 && i < 5) {
      i++;
      let x = getRandomInt(0, sauces.length);
      selectedIds.push(sauces[x]._id);
    }

    let mains = data.filter((item) => item.type === "main").map((item) => item);

    let q = 1;
    while (q > 0 && q < 8) {
      q++;
      selectedIds.push(mains[getRandomInt(0, mains.length)]._id);
    }

    setSelectedIngredients(selectedIds);
  };

  React.useEffect(() => {
    const getIngredientsData = async () => {
      try {
        let response = await fetch(url + "/api/ingredients");
        if (response.status === 200) {
          let data = await response.json();
          setIngredientsData(data.data);
          generateRandomSelectedIngredients(data.data);
          setDataLoadingStatus("loaded");
        } else {
          setDataLoadingStatus("error");
        }
      } catch (error) {
        setDataLoadingStatus("error");
      }
    };
    getIngredientsData();
  }, []);

  return (
    <React.Fragment>
      <AppHeader />
      <main className="main pl-5 pr-5">
        <BurgerIngredients
          dataLoadingStatus={dataLoadingStatus}
          ingredientsData={ingredientsData}
          selectedIngredients={selectedIngredients}
        />
        <BurgerConstructor
          dataLoadingStatus={dataLoadingStatus}
          ingredientsData={ingredientsData}
          selectedIngredients={selectedIngredients}
        />
      </main>
    </React.Fragment>
  );
}

export default App;
