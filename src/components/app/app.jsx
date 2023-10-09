import React, { useEffect, useState } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { checkResponse } from "../../utils/API";
import { ConstructorContext, IngredientsContext, BunContext } from "../../services/ComponentContext";
import { BASE_URL } from "../../utils/constants";

function App() {
  const [ data, setData ] = useState([]);
  const [ constructorBurgers, setConstructorBurgers ] = useState([]);
  const [ consturctorBun, setConstructorBun ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ hasError, setHasError ] = useState(false);

  useEffect(() => {
    const getBurger = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        const response = await fetch(`${BASE_URL}/ingredients`);
        const res = await checkResponse(response);
        setData(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log('Ошибка при получении данных', error.message);
        setHasError(true);
        setIsLoading(false);
        alert('Произошла ошибка при отправке запроса. Пожалуйста, попробуйте еще раз.');
      }
    };
    getBurger();
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
        <IngredientsContext.Provider value={{ data, setData }}>
          <ConstructorContext.Provider value={{ constructorBurgers, setConstructorBurgers }}>
            <BunContext.Provider value={{ consturctorBun, setConstructorBun }}>
              {data && <main className={styles.main}>
              {isLoading ? (
                <p>Загрузка данных...</p>
              ) : (
                <>
                  {hasError ? (
                    <p>Произошла ошибка при загрузке данных.</p>
                  ) : (
                    <>
                      <BurgerIngredients /> 
                      <BurgerConstructor />
                    </>
                  )}
                </>
              )}
              </main> 
              }
            </BunContext.Provider>
          </ConstructorContext.Provider>
        </IngredientsContext.Provider>
    </div>
  );
}

export default App;