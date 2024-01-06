import { MODAL_CLOSE, MODAL_OPEN } from "../actions";

const initModal = {
  modal: false,
  modalOrder: false,
  modalIngredient: false
}

export const modalReducer = (state = initModal, action) => {
  switch (action.type) {
    case MODAL_OPEN: {
      return {
        ...state,
        modal: true
      };
    }
    case MODAL_CLOSE: {
      return {
      ...state,
        modal: false
      };
    }
    default: {
      return state;
    }
  }
}