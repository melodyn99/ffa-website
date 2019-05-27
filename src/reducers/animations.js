import * as AnimationActionTypes from '../actiontypes/animations';

const initialState = {
	showMobileMenu: false
}

export default function AnimationReducer(state=initialState, action) {	

	switch(action.type){

		// toggle mobile menu
		case AnimationActionTypes.TOGGLE_MOBILE_MENU: {
			return {
				...state,
				showMobileMenu: !state.showMobileMenu,

			};
		}

		// reset mobile menu
		case AnimationActionTypes.RESET_MOBILE_MENU: {
			return {
				...state,
				showMobileMenu: false,
			};
		}

		default:
			return state;
	}
}
