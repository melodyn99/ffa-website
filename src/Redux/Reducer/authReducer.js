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

		// START FROM HERE
		case AuthActionTypes.LOGIN_SUCCESS: {
			return {
				...state,
				auth: true,
				token: action.data.access_token,
				refreshToken: action.data.refresh_token
			}
		}

		case AuthActionTypes.GET_USER_INFO: {
			return {
				...state,
				userInfo: action.data
			}
		}

		case AuthActionTypes.REFRESH_TOKEN_BY_REFRESH_TOKEN: {
			return {
				...state,
				token: action.data.access_token,
				refreshToken: action.data.refresh_token
			}
		}

		case AuthActionTypes.SET_RELATED_DATA_ID: {
			return {
				...state,
				relatedDataId: action.data
			}
		}

		default:
			return state;
	}
};

export default authReducer;
