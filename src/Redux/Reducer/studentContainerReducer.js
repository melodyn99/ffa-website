import {
  GET_STUDENT_CONTAINER, UPDATE_SEAT_NO, UPDATE_DRAGGABLE, UPDATE_COMPANY_COLOR, RESET_STUDENT_CONTAINER, SET_STUDENT_CONTAINER,
} from '../Constant/ActionType';

const initialState = {
  companies: [],
};

const resetState = initialState;

const studentContainerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STUDENT_CONTAINER:
      return state;
    case UPDATE_SEAT_NO:
      return {
        ...state,
        companies: state.companies.map(company => (company && company.name === action.name
          ? {
            ...company,
            seatno: company.seatno.map((seat, index) => (index === action.id
              ? action.seatno : seat)),
          }
          : company)),
      };
    case UPDATE_DRAGGABLE:
      console.log('rs : ', action)
      return {
        ...state,
        companies: state.companies.map(company => (company && company.name === action.name
          ? {
            ...company,
            draggable: company.draggable.map((d, index) => {
              if (index === action.id) {
                return action.drag;
              }
              return d;
            }),
          }
          : company)),
      };
    case UPDATE_COMPANY_COLOR:
      console.log({
        ...state,
        companies: state.companies.map(company => (company && company.name === action.name
          ? {
            ...company,
            color: action.color,
          }
          : company)),
      });
      return {
        ...state,
        companies: state.companies.map(company => (company && company.name === action.name
          ? {
            ...company,
            color: action.color,
          }
          : company)),
      };
    case RESET_STUDENT_CONTAINER:
      return resetState;
    case SET_STUDENT_CONTAINER:
      return {
        ...state,
        companies: action.companies,
      };
    default:
      return state;
  }
};

export default studentContainerReducer;
