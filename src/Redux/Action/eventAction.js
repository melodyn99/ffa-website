import {
  GET_EVENT, ADD_EVENT, SET_VIEWING_EVENT,
  SET_NOTE_TITLE,VIEWING_NOTE
} from '../Constant/ActionType';

export const setNoteTitle = noteTitle => ({
  type: SET_NOTE_TITLE,
  noteTitle,
});

export const getEvent = ({
  type: GET_EVENT,
});

export const addEvent = event => ({
  type: ADD_EVENT,
  event,
});

export const viewingEventAction = event => ({
  type: SET_VIEWING_EVENT,
  event,
});
export const viewingNoteAction = note => ({
  type: VIEWING_NOTE,
  note,
});

