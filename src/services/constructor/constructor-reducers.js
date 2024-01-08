import { ADD_BUN, ADD_INGREDIENT, DELETE_INGREDIENT, SORT_INGREDIENT } from "./constructor-actions"

const initialState = {
  bun: null,
  filling: []
}

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUN:
      return {
        ...state,
        bun: action.payload
      };
    case ADD_INGREDIENT:
      return {
        ...state,
        filling: [...state.filling, {
          numberFilling: action.payload.numberFilling,
          filling: action.payload.filling
        }]
      };
    case DELETE_INGREDIENT:
      return {
        ...state,
        filling: [...state.filling].filter(item => item.numberFilling !== action.payload)
      };
    case SORT_INGREDIENT:
      return {
        ...state,
        filling: action.payload
      };
    default: {
      return state;
    }
  }
}