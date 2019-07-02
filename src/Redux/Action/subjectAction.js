import * as SubjectActionTypes from '../Constant/ActionType';

export const getSimpleSubject = (data) => ({
    type: SubjectActionTypes.GET_SIMPLE_SUBJECT,
    data
  })