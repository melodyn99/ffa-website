import {
  UPDATE_NAME, UPDATE_COLOR, RESET_SEATS, SET_SEATS, UPDATE_EMPTY,
} from '../Constant/ActionType';

// Seats id must use official ANSI alphabet.
const initialState = {
  seats: {},
  hasDrag: true,
};

const resetState = initialState;

const seatMapReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NAME:
      return {
        ...state,
        seats: {
          ...state.seats,
          [action.id]: {
            ...state.seats[action.id],
            studentName: action.name,
          },
        },
      };
    case UPDATE_COLOR:
      console.log('actions: ', action)
      return {
        ...state,
        seats: {
          ...state.seats,
          [action.id]: {
            ...state.seats[action.id],
            color: action.color,
          },
        },
      };
    case UPDATE_EMPTY:
      return {
        ...state,
        seats: {
          ...state.seats,
          [action.id]: {
            ...state.seats[action.id],
            empty: action.empty,
          },
        },
      };
    case RESET_SEATS:
      return resetState;
    case SET_SEATS:
      return {
        ...state,
        seats: action.seats,
      };
    case 'SET_DRAG':
      return {
        ...state,
        hasDrag: action.hasDrag,
      };
    default:
      return state;
  }
};

export default seatMapReducer;
