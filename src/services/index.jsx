import { combineReducers } from 'redux';
import { renderedIngredientReducer } from './ingredients/ingredients-reducers';
import { burgerConstructorReducer } from './constructor/constructor-reducers';
import { modalInfoIngredientReducer, requiredIngredientInfoReducer } from './reducers/ingredient-info';
import { modalReducer } from './reducers/modal';
import { modalOrderReducer, orderReducer } from './reducers/modal-order';

export const rootReducer = combineReducers({
  renderedIngredient: renderedIngredientReducer,
  constructor: burgerConstructorReducer,
  modalInfoIngredient: modalInfoIngredientReducer,
  requiredIngredientInfo: requiredIngredientInfoReducer,
  modalOrder: modalOrderReducer,
  modal: modalReducer,
  order: orderReducer
});
