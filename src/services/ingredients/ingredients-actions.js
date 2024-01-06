import { BASE_URL } from "../../utils/constants";
import { checkResponse } from "../../utils/API";

export const GET_INGREDIENTS_REQUIRED = 'GET_INGREDIENTS_REQUIRED';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const getIngredients = () => {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUIRED
    });
    return fetch(`${BASE_URL}/ingredients`)
    .then(res => checkResponse(res))
      .then(result => {
      if(result && result.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          data: result.data
        });
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        });
      }
    })
  }
}