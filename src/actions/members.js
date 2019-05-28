import * as MembersActionTypes from '../actiontypes/members';

export const toLogin = (data) => {
    return {
        type: MembersActionTypes.TO_LOGIN,
        data
    };
}

export const toRegister = (data) => {
    return {
        type: MembersActionTypes.TO_REGISTER,
        data
    };
}

export const MobileVerification = (data) => {

    return {

        type: MembersActionTypes.MobileVerification,
        data
    };
}

export const ResetRegistration = (ResetRegistration) => {
    return {
        type: MembersActionTypes.ResetRegistration
    }
}

export const toLogout = () => {
    return {
        type: MembersActionTypes.TO_LOGOUT
    };
}

export const toggleWishList = (data) => {
    return {
        type: MembersActionTypes.TOGGLE_WISHLIST,
        data
    }
}

export const updateWishList = (data) => {
    return {
        type: MembersActionTypes.UPDATE_WISHLIST,
        data
    }
}
