import React, { useEffect, useState, useContext, useReducer, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { renderedIngredientData, renderedIngredientRequired } from "../../services/ingredients/ingredients-selectors";
import { getIngredients } from "../../services/ingredients/ingredients-actions";

function App() {

  const dispatch = useDispatch();

  const data = useSelector(renderedIngredientData)
  const requestIngredients = useSelector(renderedIngredientRequired)

  useEffect(
    () => {
      dispatch(getIngredients())
    },
    [dispatch]
  )

  const waitContent = useMemo(
    () => {
      return requestIngredients ? (
        <p>Загрузка данных...</p>
      ) : (
        <BurgerIngredients />
      );
    },
    [requestIngredients, data]
  )

  return (
    <div className={styles.app}>
      <AppHeader />
      {data && <main className={styles.main}>
        {waitContent}
        <BurgerConstructor />  
      </main>}
    </div>
  );
}

export default App;