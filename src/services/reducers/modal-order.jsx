import { GET_ORDER_REQUIRED, GET_ORDER_SUCCESS, GET_ORDER_FAILED, MODAL_CLOSE_ORDER, MODAL_OPEN_ORDER } from "../actions";

const initOrder = {
  order: {},
  orderRequired: false,
  orderFailed: false
}

export const modalOrderReducer = (state = initOrder, action) => {
  switch (action.type) {
    case MODAL_OPEN_ORDER: {
      return {
       ...state,
        modalOrder: true
      };
    }
    case MODAL_CLOSE_ORDER: {
      return {
     ...state,
        modalOrder: false,
        order: {}
      };
    }
    default: {
      return state;
    }
  }
}

export const orderReducer = (state = initOrder, action) => {
  switch (action.type) {
    case GET_ORDER_REQUIRED: {
      return {
        ...state,
        orderRequired: true,
        order: { number: 'Формирование заказа' }
      }
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequired: false,
        order: action.order
      }
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderRequired: false,
        orderFailed: true
      }
    }
    default: {
      return state;
    }
  }
}