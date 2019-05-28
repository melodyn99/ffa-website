import {
  ADD_SEATING_PLAN,
  ISEDIT_SEATING_PLAN,
  VIEWING_SEATING_PLAN_TYPE,
  PLAN_TYPE_SELECTED,
  EDIT_ENABLE,
  SET_PLAN,
  SET_EDIT_PLAN_TYPE,
  SET_EDIT,
} from '../Constant/ActionType';

const INITIAL_STATE = {
  isEdit: false,
  seatingplans: [],
  seatingPlanType: null,
  planTypeSelected: null,
  editEnable: false,
  plan: new Map()
};

const seatingPlanReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PLAN:
      const plan_seat = new Map();
      const plan_id = new Map();
      for (const seat of action.plan.seating_plan) {
        plan_seat.set(`${seat.sequence}${seat.seat}`, seat);
        plan_id.set(seat.conference_student, seat);
      }
      return {
        ...state,
        plan: action.plan,
        plan_seat,
        plan_id
      };
    case SET_EDIT_PLAN_TYPE:
      return {
        ...state,
        editPlanType: action.plan_type
      };
    case SET_EDIT:
      return {
        ...state,
        editState: action.state
      };
    case ADD_SEATING_PLAN:
      return {
        ...state,
        seatingplans: state.seatingplans.concat(action.plan),
      };
    case ISEDIT_SEATING_PLAN:
      return {
        ...state,
        isEdit: action.isEdit,
      };
    case VIEWING_SEATING_PLAN_TYPE:
      return {
        ...state,
        seatingPlanType: action.seatingPlanType,
      };
    case PLAN_TYPE_SELECTED:
      return {
        ...state,
        planTypeSelected: action.seatingPlanType,
      };
    case EDIT_ENABLE:
      return {
        ...state,
        editEnable: action.edit,
      };
    default:
      return state;
  }
};

export default seatingPlanReducer;
