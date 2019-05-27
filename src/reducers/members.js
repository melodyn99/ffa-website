import * as MembersActionTypes from '../actiontypes/members';

const initialState = {
    Register: [],
    Login: [],
    // Login: {
    //     userId: '123',
    //     userToken: 'sdfsdfsdfsdfsd'
    // },
    MobileVerify: [],
}

export default function MembersReducer(state = initialState, action) {

    switch (action.type) {

        // to Register
        case MembersActionTypes.TO_REGISTER: {

            return {
                ...state,
                Register: {
                    isRegistered: true,
                    RegisterEmailAddress: action.data.EmailAddress,
                    RegisterPassword: action.data.Password,
                    RegisterConfirmPassword: action.data.ConfirmPassword,
                    RegisterFirstName: action.data.FirstName,
                    RegisterLastName: action.data.LastName,
                    RegisterObjectPersonalData: action.data.objectPersonalData,
                }
            }
        }

        // to Login
        case MembersActionTypes.TO_LOGIN: {

            return {
                ...state,
                Login: action.data
            }
        }

        // to Login
        case MembersActionTypes.MobileVerification: {

            return {
                ...state,
                MobileVerify: {
                    isMobileVerified: true,
                    countryCode: action.data.countryCode,
                    mobileNumber: action.data.mobileNumber,
                    smsVerificationCode: action.data.smsVerificationCode
                }
            }
        }

        default:
            return state;
    }
}
