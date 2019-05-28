import {
  ADD_SEATING_PLAN, ISEDIT_SEATING_PLAN, VIEWING_SEATING_PLAN_TYPE,
  PLAN_TYPE_SELECTED, EDIT_ENABLE, SET_PLAN, SET_EDIT_PLAN_TYPE, SET_EDIT
} from '../Constant/ActionType';

export const setPlan = (plan) => ({
  plan,
  type: SET_PLAN
});

export const setEditPlanType = (plan_type) => ({
  plan_type,
  type: SET_EDIT_PLAN_TYPE
});

export const setEdit = (state) => ({
  state,
  type: SET_EDIT
});

export const addSeatingPlan = plan => ({
  plan,
  type: ADD_SEATING_PLAN,
});

export const isEditSeatingPlan = isEdit => ({
  type: ISEDIT_SEATING_PLAN,
  isEdit,
});

export const viewingSeatingPlanType = seatingPlanType => ({
  type: VIEWING_SEATING_PLAN_TYPE,
  seatingPlanType,
});

export const selectPlanType = seatingPlanType => ({
  type: PLAN_TYPE_SELECTED,
  seatingPlanType,
});

export const editEnable = edit => ({
  type: EDIT_ENABLE,
  edit,
});
