import {
  GET_STUDENT_CONTAINER,
  UPDATE_SEAT_NO,
  UPDATE_DRAGGABLE,
  UPDATE_COMPANY_COLOR,
  RESET_STUDENT_CONTAINER,
  SET_STUDENT_CONTAINER,
} from '../Constant/ActionType';

export const getStudentContainer = ({
  type: GET_STUDENT_CONTAINER,
});

export const updateSeatNo = (name, id, seatno) => ({
  type: UPDATE_SEAT_NO,
  name,
  id,
  seatno,
});

export const updateDraggable = (name, id, drag) => ({
  type: UPDATE_DRAGGABLE,
  name,
  id,
  drag,
});

export const updateCompanyColor = (name, color) => ({
  type: UPDATE_COMPANY_COLOR,
  name,
  color,
});

export const resetStudentContainer = ({
  type: RESET_STUDENT_CONTAINER,
});

export const setStudentContainer = companies => ({
  type: SET_STUDENT_CONTAINER,
  companies,
});
