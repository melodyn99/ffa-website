import {
  UPDATE_CURRENT_SEMINAR, UPDATE_CURRENT_LIBRARY, UPDATE_LIBRARY_CHECK, UPDATE_DOCUMENT_CHECK,
  UPDATE_CURRENT_EVENT, UPDATE_TEACHER_TAB,
} from '../Constant/ActionType';

const initialState = {
  currentSeminar: 0,
  currentLibrary: 0,
  currentEvent: 0,
  currentTeacherTab: 0,
  libraryCheck: [],
  documentCheck: [],
};

const viewContentReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_SEMINAR:
      return {
        ...state,
        currentSeminar: action.seminarSelected,
      };
    case UPDATE_CURRENT_LIBRARY:
      return {
        ...state,
        currentLibrary: action.librarySelected,
      };
    case UPDATE_CURRENT_EVENT:
      return {
        ...state,
        currentEvent: action.eventSelected,
      };
    case UPDATE_LIBRARY_CHECK:
      return {
        ...state,
        libraryCheck: action.checkBox,
      };
    case UPDATE_DOCUMENT_CHECK:
      return {
        ...state,
        documentCheck: action.documentCheckBox,
      };
    case UPDATE_TEACHER_TAB:
      return {
        ...state,
        currentTeacherTab: action.currentTab,
      };
    default:
      return state;
  }
};

export default viewContentReducer;
