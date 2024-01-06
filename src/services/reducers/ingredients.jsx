import { GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUIRED, GET_INGREDIENTS_SUCCESS } from "../actions";

const initIngredients = {
  ingredients: [],
  ingredientsRequired: false,
  ingredientsFailed: false
}

export const renderedIngredientReducer = (state = initIngredients, action) => {
  console.log('renderedIngredientReducer', action.type, state);
  switch (action.type) {
    case GET_INGREDIENTS_REQUIRED: {
      return {
        ...state,
        ingredientsRequired: true
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.data,
        ingredientsFailed: false,
        ingredientsRequired: false
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsFailed: true,
        ingredientsRequired: false
      };
    }
    default: {
      return state;
    }
  }
}