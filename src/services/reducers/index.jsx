import { combineReducers } from 'redux';
import { renderedIngredientReducer } from './ingredients';
import { constructorReducer } from './constructor';
import { modalInfoIngredientReducer, requiredIngredientInfoReducer } from './ingredient-info';
import { modalReducer } from './modal';
import { modalOrderReducer, orderReducer } from './modal-order';

export const rootReducer = combineReducers({
  renderedIngredient: (state, action) => {
    console.log('rootReducer - renderedIngredient', action.type, state);
    return renderedIngredientReducer(state, action);
  },
  constructor: constructorReducer,
  modalInfoIngredient: modalInfoIngredientReducer,
  requiredIngredientInfo: requiredIngredientInfoReducer,
  modalOrder: modalOrderReducer,
  modal: modalReducer,
  order: orderReducer
})