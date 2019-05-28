import {
  SET_USER_PROFILE,
  IS_EDITTING_USER,
} from '../Constant/ActionType';

const INITIAL_STATE = { isEditting: false };

const profileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER_PROFILE:
      return action.profile;
    case IS_EDITTING_USER:
      return {
        ...state,
        isEditting: !state.isEditting,
      };
    default:
      return state;
  }
};

export default profileReducer;
