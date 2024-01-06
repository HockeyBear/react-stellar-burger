import React, { useEffect, useState, useContext, useReducer, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
// import { checkResponse } from "../../utils/API";
import { getIngredients } from "../../services/actions/index";
// import { ConstructorContext, IngredientsContext, BunContext } from "../../services/ComponentContext";

import { BASE_URL } from "../../utils/constants";

function App() {
  const dispatch = useDispatch();

  const data = useSelector(store => store.renderedIngredient.ingredients)
  const requestIngredients = useSelector(store => store.renderedIngredient.requestIngredients)

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