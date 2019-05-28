import {
  SET_VIEWING_ACCOUNT,
  SET_ACCOUNTS,
  HAS_EDIT_BUTTON_ACCOUNT,
  UPDATE_NEW_USER,
  UPDATE_USER_TAB,
  SET_TYPE_VIEW_SEMINAR_USER
} from '../Constant/ActionType';

export const setViewingAccount = account => ({
  type: SET_VIEWING_ACCOUNT,
  account,
});

export const setAccounts = accounts => ({
  type: SET_ACCOUNTS,
  accounts,
});

export const setEditButton = hasEditButton => ({
  type: HAS_EDIT_BUTTON_ACCOUNT,
  hasEditButton,
});

export const updateNewUser = user => ({
  type: UPDATE_NEW_USER,
  payload: user,
});

export const updateTab = currentTab => ({
  type: UPDATE_USER_TAB,
  currentTab,
});
export const setTypeViewSeminarUser = type =>({
  type: SET_TYPE_VIEW_SEMINAR_USER,
  payload: type
})