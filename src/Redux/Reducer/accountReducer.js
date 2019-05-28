import {
  SET_VIEWING_ACCOUNT,
  SET_ACCOUNTS,
  HAS_EDIT_BUTTON_ACCOUNT, UPDATE_NEW_USER,
  UPDATE_USER_TAB,
  SET_TYPE_VIEW_SEMINAR_USER,
} from '../Constant/ActionType';

const initialState = {
  viewingAccount: {},
  accounts: [],
  hasEditButton: true,
  newUser: {},
  currentTab: 0,
  typeViewSeminarUser: 'view',
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VIEWING_ACCOUNT:
      return {
        ...state,
        viewingAccount: action.account,
      };
    case SET_ACCOUNTS:
      return {
        ...state,
        accounts: action.accounts,
      };
    case HAS_EDIT_BUTTON_ACCOUNT:
      return {
        ...state,
        hasEditButton: action.hasEditButton,
      };
    case UPDATE_NEW_USER:
      return {
        ...state,
        newUser: action.payload,
      };
    case UPDATE_USER_TAB:
      return {
        ...state,
        currentTab: action.currentTab,
      };
    case SET_TYPE_VIEW_SEMINAR_USER:
      return {
        ...state,
        typeViewSeminarUser: action.payload,
      }
    default:
      return state;
  }
};

export default accountReducer;
