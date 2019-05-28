import {
  UPDATE_NAME, UPDATE_COLOR, RESET_SEATS, SET_SEATS, UPDATE_EMPTY,
} from '../Constant/ActionType';

export const updateName = (id, name) => ({
  type: UPDATE_NAME,
  id,
  name,
});

export const updateColor = (id, color) => ({
  type: UPDATE_COLOR,
  id,
  color,
});

export const resetSeats = ({
  type: RESET_SEATS,
});

export const setSeats = seats => ({
  type: SET_SEATS,
  seats,
});

export const updateEmpty = (id, empty) => ({
  type: UPDATE_EMPTY,
  id,
  empty,
});
