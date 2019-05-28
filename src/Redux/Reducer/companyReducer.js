import {
  SET_VIEWING_COMPANY, IS_EDITTING_COMPANY, HAS_EDIT_BUTTON_COMPANY,
  IS_STUDENT_ACCOUNT_TAB, SET_COMPANIES_ACCOUNTMGT, SET_TAB_COMPANY,
  SET_COMPANY_SORT_TYPE
} from '../Constant/ActionType';

const initialState = {
  isEditting: false,
  hasEditButton: false,
  isStudentAccountTab: false,
  companiesAccountMgt: [],
  viewingCompany: {},
  tabID: '',
  sortType: "name"
};

const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMPANY_SORT_TYPE:
      return {
        ...state,
        sortType: action.sortType,
      };
    case IS_EDITTING_COMPANY:
      return {
        ...state,
        isEditting: !state.isEditting,
      };
    case SET_VIEWING_COMPANY:
      return {
        ...state,
        ...action.company,
        viewingCompany: action.company,
      };
    case HAS_EDIT_BUTTON_COMPANY:
      return {
        ...state,
        hasEditButton: action.hasEditButton,
      };

    case IS_STUDENT_ACCOUNT_TAB:
      return {
        ...state,
        isStudentAccountTab: action.isStudentAccountTab,
      };

    case SET_COMPANIES_ACCOUNTMGT:
      return {
        ...state,
        companiesAccountMgt: action.companies,
      };
    case SET_TAB_COMPANY:
      return {
        ...state,
        tabID: action.tabID,
      };
    default:
      return state;
  }
};

export default companyReducer;
