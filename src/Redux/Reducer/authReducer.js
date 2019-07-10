import * as AuthActionTypes from '../Constant/ActionType';
import { clearLoginData } from '../../Util/AuthService';

const initialState = {
	auth: false,
	token: null,
	refreshToken: null,
	userInfo: []
};

const authReducer = (state = initialState, action) => {

	switch (action.type) {

		case AuthActionTypes.GET_TOKEN: {
			return {
				state
			}
		}

		case AuthActionTypes.VERIFY_TOKEN: {
			if (action.data !== null)
				return {
					auth: true
				}

			return {
				auth: false
			}
		}

		case AuthActionTypes.LOGIN_SUCCESS: {
			return {
				auth: true,
				token: action.data
			}
		}

		case AuthActionTypes.LOGIN_FAILURE: {
			return {
				auth: false
			}
		}

		case AuthActionTypes.LOGOUT: {
			clearLoginData();
			return {
				auth: false
			}
		}

		case AuthActionTypes.SET_CONFERENCE_ID: {
			return {
				...state,
				relatedTempStorage: action.data
			}
		}

		default:
			return state;
	}
};

export default authReducer;
