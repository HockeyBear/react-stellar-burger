import React, { useEffect, useState } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { checkResponse } from "../../utils/API";
import { ConstructorContext, IngredientsContext, BunContext } from "../../services/ComponentContext";

const URL_API = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [ ingredientData, setIngredientData ] = useState([]);
  const [ constructorBurgers, setConstructorBurgers ] = useState([]);
  const [ consturctorBun, setConstructorBun ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ hasError, setHasError ] = useState(false);

  useEffect(() => {
    const getBurger = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        const response = await fetch(URL_API);
        const res = await checkResponse(response);
        setIngredientData(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log('Ошибка при получении данных', error.message);
        setHasError(true);
        setIsLoading(false);
      }
    };
    getBurger();
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <IngredientsContext.Provider value={{ ingredientData, setIngredientData }}>
          <ConstructorContext.Provider value={{ constructorBurgers, setConstructorBurgers }}>
            <BunContext.Provider value={{ consturctorBun, setConstructorBun }}>
              {isLoading ? (
                <p>Загрузка данных...</p>
              ) : (
                <>
                  {hasError ? (
                    <p>Произошла ошибка при загрузке данных.</p>
                  ) : (
                    <>
                      <BurgerIngredients data={ingredientData}/> 
                      <BurgerConstructor data={ingredientData}/>
                    </>
                  )}
                </>
              )}
            </BunContext.Provider>
          </ConstructorContext.Provider>
        </IngredientsContext.Provider>
      </main>
    </div>
  );
}

export default App;