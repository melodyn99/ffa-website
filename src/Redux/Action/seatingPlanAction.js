import * as SeatingPlanActionTypes from '../Constant/ActionType';

export const setPlan = (plan) => ({
  type: SeatingPlanActionTypes.SET_PLAN,
  plan
});

export const setEditPlanType = (plan_type) => ({
  type: SeatingPlanActionTypes.SET_EDIT_PLAN_TYPE,
  plan_type
});

export const setEdit = (state) => ({
  type: SeatingPlanActionTypes.SET_EDIT,
  state
});

export const addSeatingPlan = plan => ({
  type: SeatingPlanActionTypes.ADD_SEATING_PLAN,
  plan
});

export const isEditSeatingPlan = isEdit => ({
  type: SeatingPlanActionTypes.ISEDIT_SEATING_PLAN,
  isEdit
});

export const viewingSeatingPlanType = seatingPlanType => ({
  type: SeatingPlanActionTypes.VIEWING_SEATING_PLAN_TYPE,
  seatingPlanType
});

export const selectPlanType = seatingPlanType => ({
  type: SeatingPlanActionTypes.PLAN_TYPE_SELECTED,
  seatingPlanType
});

export const editEnable = edit => ({
  type: SeatingPlanActionTypes.EDIT_ENABLE,
  edit
});
