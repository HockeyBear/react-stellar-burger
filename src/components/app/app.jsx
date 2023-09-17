import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useEffect, useState } from "react";

const URL_API = 'https://norma.nomoreparties.space/api/ingredients';


function App() {
  const [state, setState] = useState({
    ingredientData: [],
    isLoading: true,
    hasError: false,
  });

  useEffect(() => {
    const getBurger = async () => {
      try {
        setState({ ...state, isLoading: true, hasError: false });
        fetch(URL_API)
        .then((res) => res.json())
        .then((data) => {
          setState({ ...state, ingredientData: data.data, isLoading: false });
        });
      } catch (error) {
        console.log('Ошибка при получении данных', error.message);
      } finally {
        setState({ ...state, isLoading: false});
      }
    };
    getBurger();
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        {state.isLoading ? (
          <p>Загрузка данных...</p>
        ) : (
          <>
            <BurgerIngredients data={state.ingredientData}/> 
            <BurgerConstructor data={state.ingredientData}/>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
