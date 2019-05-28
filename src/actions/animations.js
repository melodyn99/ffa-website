import * as AnimationActionTypes from '../actiontypes/animations';

export const toggleMobileMenu = () => {
	return {
		type: AnimationActionTypes.TOGGLE_MOBILE_MENU,
	};
}

export const resetMobileMenu = () => {
	return {
		type: AnimationActionTypes.RESET_MOBILE_MENU,
	};
}
