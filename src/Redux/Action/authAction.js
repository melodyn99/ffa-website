import * as AuthActionTypes from '../Constant/ActionType';
// import { refreshTokenInterval } from '../../Util/AuthService';

export const getToken = ({
  type: AuthActionTypes.GET_TOKEN,
});

export const verifyToken = (data) => ({
  type: AuthActionTypes.VERIFY_TOKEN,
  data,
});

export const loginSuccess = (data) => ({
  type: AuthActionTypes.LOGIN_SUCCESS,
  data
});

export const loginFailure = ({
  type: AuthActionTypes.LOGIN_FAILURE,
});


export const login = (data) => ({
  type: AuthActionTypes.LOGIN_SUCCESS,
  data
});

// export const login = (id, pw) => dispatch => apiAuth.authenticate(id, pw).then((res) => {
//   return Promise.resolve(setAccessToken(res.access_token)).then(() => {
//     return Promise.all([
//       CacheService.saveAuthData(res),
//       apiUsers.getUserDetail(id).then((resp) => {
//         if (!resp.error) {
//           return Promise.all([
//             Promise.resolve(setUserProfile(resp)).then((setUserProfileResult) => {
//               dispatch(setUserProfileResult);
//             }),
//             CacheService.saveProfileData(resp)
//           ]);
//         }
//       })
//     ])
//   })
// }).then(() => dispatch(loginSuccess)).catch(() => {
//   alert('Login failed, please check your username or password');
//   return dispatch(loginFailure);
// });

export const logout = ({
  type: AuthActionTypes.LOGOUT,
});
