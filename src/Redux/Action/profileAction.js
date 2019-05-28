import {
  SET_USER_PROFILE,
  IS_EDITTING_USER,
} from '../Constant/ActionType';

export const setUserProfile = profile => ({
  profile,
  type: SET_USER_PROFILE,
});

export const editUser = () =>({
  type: IS_EDITTING_USER,
});
