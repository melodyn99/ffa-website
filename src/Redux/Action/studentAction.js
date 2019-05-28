import {
  ADD_STUDENT, GET_STUDENT, UPDATE_STUDENT_STATUS,
  UPDATE_CURRENT_STUDENT, UPDATE_EDITABLE, IS_EDITTING_STUDENT,
  VIEWING_CURRENT_STUDENT,GET_LIST_STUDENT_COMPANY,
} from '../Constant/ActionType';

export const addStudent = (name, company, brand, phone, email,
  wechat, district, address, courses) => ({
  type: ADD_STUDENT,
  name,
  company,
  brand,
  phone,
  email,
  wechat,
  district,
  address,
  courses,
});

export const getStudent = ({
  type: GET_STUDENT,
});

export const updateStudentStatus = ({ idx, feeHandIn, attended }) => ({
  type: UPDATE_STUDENT_STATUS,
  idx,
  feeHandIn,
  attended,
});

export const updateCurrentStudent = student => ({
  type: UPDATE_CURRENT_STUDENT,
  student,
});

export const updateEditable = editable => ({
  type: UPDATE_EDITABLE,
  editable,
});

export const editStudent = isEditting => ({
  type: IS_EDITTING_STUDENT,
  isEditting,
});
export const viewingCurentStudent = currentStudent => ({
  type: VIEWING_CURRENT_STUDENT,
  currentStudent,
});
export const getStudentCompany = listStudent => ({
  type: GET_LIST_STUDENT_COMPANY,
  listStudent,
});
