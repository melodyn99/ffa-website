import * as SeatingPlanActionTypes from '../Constant/ActionType';

const INITIAL_STATE = {
    isEdit: false,
    seatingplans: [],
    seatingPlanType: null,
    planTypeSelected: null,
    editEnable: false,
    plan: new Map(),
    editPlanType: []
};

const seatingPlanReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case SeatingPlanActionTypes.SET_PLAN: {
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
        }

        case SeatingPlanActionTypes.SET_EDIT_PLAN_TYPE: {
            return {
                ...state,
                editPlanType: action.plan_type
            }
        }

        case SeatingPlanActionTypes.SET_EDIT: {
            return {
                ...state,
                editState: action.state
            }
        }

        case SeatingPlanActionTypes.ADD_SEATING_PLAN: {
            return {
                ...state,
                seatingplans: state.seatingplans.concat(action.plan),
            }
        }

        case SeatingPlanActionTypes.ISEDIT_SEATING_PLAN: {
            return {
                ...state,
                isEdit: action.isEdit,
            }
        }

        case SeatingPlanActionTypes.VIEWING_SEATING_PLAN_TYPE: {
            return {
                ...state,
                seatingPlanType: action.seatingPlanType,
            }
        }

        case SeatingPlanActionTypes.PLAN_TYPE_SELECTED: {
            return {
                ...state,
                planTypeSelected: action.seatingPlanType,
            }
        }

        case SeatingPlanActionTypes.EDIT_ENABLE: {
            return {
                ...state,
                editEnable: action.edit,
            }
        }

        default:
            return state;
    }
};

export default seatingPlanReducer;
