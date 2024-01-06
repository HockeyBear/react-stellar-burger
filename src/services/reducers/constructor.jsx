import { ADD_BUN, ADD_INGREDIENT, DELETE_INGREDIENT, SORT_INGREDIENT } from "../actions"

const initConstructor = {
  bun: {},
  items: [],
}

export const constructorReducer = (state = initConstructor, action) => {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...state,
        bun: action.bun
      }
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        items: [...state.items, action.item]
      }
    }
    case DELETE_INGREDIENT: {
      return {
      ...state,
        items: state.items.filter(item => item.id !== action.id)
      }
    }
    case SORT_INGREDIENT: {
      const dragIngredient = state.items[action.dragIndex];
      const newIngredietns = [...state.items];
      newIngredietns.splice(action.dragIndex, 1);
      newIngredietns.splice(action.hoverIndex, 0, dragIngredient);
      return {
        ...state,
        items: newIngredietns
      }
    }
    default: {
      return state;
    }
  }
}