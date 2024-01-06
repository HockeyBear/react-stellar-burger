import { BASE_URL } from '../../utils/constants';

export const GET_INGREDIENTS_CONSTRUCTOR = 'GET_INGREDIENTS_CONSTRUCTOR';

export const GET_CURRENT_INGREDIENT = 'GET_CURRENT_INGREDIENT';

export const DELETE_CURRENT_INGREDIENT = 'DELETE_CURRENT_INGREDIENT';

export const GET_ORDER_REQUIRED = 'GET_ORDER_REQUIRED';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const ADD_BUN = 'ADD_BUN';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const SORT_INGREDIENT = 'SORT_INGREDIENT';

export const MODAL_OPEN = 'MODAL_OPEN';
export const MODAL_CLOSE = 'MODAL_CLOSE';

export const MODAL_OPEN_ORDER = 'MODAL_OPEN_ORDER';
export const MODAL_CLOSE_ORDER = 'MODAL_CLOSE_ORDER';

export const MODAL_OPEN_INGREDIENT = 'MODAL_OPEN_INGREDIENT';
export const MODAL_CLOSE_INGREDIENT = 'MODAL_CLOSE_INGREDIENT';

export const getOrder = (burger) => {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUIRED
    });
    return fetch(`${BASE_URL}/orders`, burger).then(result => {
      console.log(result);
      if(result && result.success) {
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: result.order
        });
      } else {
        dispatch({
          type: GET_ORDER_FAILED,
          order: result
        });
      }
    })
  }
}
