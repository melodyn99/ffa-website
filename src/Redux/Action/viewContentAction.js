import {
  UPDATE_CURRENT_SEMINAR, UPDATE_CURRENT_LIBRARY, UPDATE_LIBRARY_CHECK, UPDATE_DOCUMENT_CHECK,
  UPDATE_CURRENT_EVENT, UPDATE_TEACHER_TAB,
} from '../Constant/ActionType';

export const updateCurrentSeminar = seminarSelected => ({
  type: UPDATE_CURRENT_SEMINAR,
  seminarSelected,
});

export const updateCurrentLibrary = librarySelected => ({
  type: UPDATE_CURRENT_LIBRARY,
  librarySelected,
});

export const updateCurrentEvent = eventSelected => ({
  type: UPDATE_CURRENT_EVENT,
  eventSelected,
});

export const updateLibraryCheck = checkBox => ({
  type: UPDATE_LIBRARY_CHECK,
  checkBox,
});

export const updateDocumentCheck = documentCheckBox => ({
  type: UPDATE_DOCUMENT_CHECK,
  documentCheckBox,
});

export const updateTeacherTab = currentTab => ({
  type: UPDATE_TEACHER_TAB,
  currentTab,
});
