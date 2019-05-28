import {
  GET_SEMINAR,
  UPDATE_SEMINAR_EDITABLE,
  ADD_SEMINAR,
  SET_VIEWING_SEMINAR,
  CHANGE_TAB,
  UPDATE_CLASS_MATERIAL,
  UPDATE_LIBRARY_DOCUMENTS,
  IS_EDITTING_SEMINAR,
  CONFIRM_EDIT_SEMINAR,
  SET_EDIT_ONSITE_TIME
} from '../Constant/ActionType';

export const setViewingSeminar = seminar => ({
  type: SET_VIEWING_SEMINAR,
  seminar,
});

export const setEdtiOnsiteTime = isEdit => ({
  type: SET_EDIT_ONSITE_TIME,
  isEdit,
});

export const addSeminar = (name, seminarType, officer, conference_sections) => ({
  type: ADD_SEMINAR,
  name,
  seminarType,
  officer,
  conference_sections,
});

export const getSeminar = id => ({
  type: GET_SEMINAR,
  id,
});

export const updateSeminarEditable = id => ({
  type: UPDATE_SEMINAR_EDITABLE,
  id,
});

export const changeTab = tabValue => ({
  type: CHANGE_TAB,
  tabValue,
});

export const updateClassMaterial = (classMaterial, currentSeminar) => ({
  type: UPDATE_CLASS_MATERIAL,
  classMaterial,
  currentSeminar,
});

export const updateLibraryDocuments = (documents, currentSeminar, currentLibrary) => ({
  type: UPDATE_LIBRARY_DOCUMENTS,
  documents,
  currentSeminar,
  currentLibrary,
});

export const editSeminar = () => ({
  type: IS_EDITTING_SEMINAR,
});

export const confirmEdit = confirmEdit => ({
  type: CONFIRM_EDIT_SEMINAR,
  confirmEdit,
});
