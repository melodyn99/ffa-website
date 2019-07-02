import * as SubjectActionTypes from '../Constant/ActionType';
// import { clearLoginData } from '../../Util/AuthService';

const initialState = {
	simpleSubject: []
};

const subjectReducer = (state = initialState, action) => {

	switch (action.type) {

		case SubjectActionTypes.GET_SIMPLE_SUBJECT: {
			return {
				...state,
				simpleSubject: action.data
			}
		}

		default:
			return state;
	}
};

export default subjectReducer;
