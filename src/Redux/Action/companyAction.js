import {
  SET_VIEWING_COMPANY, IS_EDITTING_COMPANY, HAS_EDIT_BUTTON_COMPANY,
  IS_STUDENT_ACCOUNT_TAB, SET_COMPANIES_ACCOUNTMGT, SET_TAB_COMPANY,
  SET_COMPANY_SORT_TYPE
} from '../Constant/ActionType';

export const editingCompany = () => ({
  type: IS_EDITTING_COMPANY,
});
export const setViewingCompany = company => ({
  type: SET_VIEWING_COMPANY,
  company,
});

export const setShowEditButtonOnTab = hasEditButton => ({
  type: HAS_EDIT_BUTTON_COMPANY,
  hasEditButton,
});
export const setShowButtonOnStudentAccountTab = isStudentAccountTab => ({
  type: IS_STUDENT_ACCOUNT_TAB,
  isStudentAccountTab,
});

export const setCompaniesAccountMgt = companies => ({
  type: SET_COMPANIES_ACCOUNTMGT,
  companies,
});

export const setCompanyTab = tabID => ({
  type: SET_TAB_COMPANY,
  tabID,
});

export const setCompanySortType = sortType => ({
  type: SET_COMPANY_SORT_TYPE,
  sortType,
});
