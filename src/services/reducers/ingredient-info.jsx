import { MODAL_CLOSE_INGREDIENT, MODAL_OPEN_INGREDIENT, GET_CURRENT_INGREDIENT, DELETE_CURRENT_INGREDIENT, } from "../actions";

const initIngredient = {
  currentIngredient: {}
}

export const modalInfoIngredientReducer = (state = initIngredient, action) => {
  switch (action.type) {
    case MODAL_OPEN_INGREDIENT: {
      return {
        ...state,
        modalIngredient: true
      };
    }
    case MODAL_CLOSE_INGREDIENT: {
      return {
        ...state,
        modalIngredient: false,
        currentIngredient: {}
      };
    }
    default: {
      return state;
    }
  }
}

export const requiredIngredientInfoReducer = (state = initIngredient, action) => {
  switch (action.type) {
    case GET_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.ingredient
      };
    }
    case DELETE_CURRENT_INGREDIENT: {
      return {
       ...state,
        currentIngredient: {}
      };
    }
    default: {
      return state;
    }
  }
}