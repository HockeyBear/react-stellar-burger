import uuid from "react-uuid";

export const ADD_BUN = 'ADD_BUN';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const SORT_INGREDIENT = 'SORT_INGREDIENT';

export const addBun = (ingredientBun) => {
  return {
    type: ADD_BUN,
    payload: ingredientBun
  }
}

export const addIngredient = (ingredientFilling) => {
  return {
    type: ADD_INGREDIENT,
    payload: {
      numberFilling: uuid(),
      filling: ingredientFilling
    }
  }
}

export const deleteIngredient = (idIngredientFilling) => {
  return {
    type: DELETE_INGREDIENT,
    payload: idIngredientFilling
  }
}

export const sortIngredient = (filling) => {
  return {
    type: SORT_INGREDIENT,
    payload: filling
  }
}