import { api } from './_ApiFactoryWithHeader';
import { AUDIENCE, WEB_CLIENT_CREDENTIAL_TOKEN } from '../Redux/Constant/ServerConstant';

import { apiGeneral } from './_General';

export const apiAuth = {
	authenticate: (username, password) => api.postUrlFormEncoded('auth', {
		username, password, audience: AUDIENCE, grant_type: 'password',
	}, { headers: { Authorization: `Basic ${WEB_CLIENT_CREDENTIAL_TOKEN}` } }),

	// authenticate: (params, token, cb, eCb) => {
	// 	apiGeneral.apiPost('auth', params, token, cb, eCb);
	// },


	// REAL
	getUserInformation: (params, token, cb, eCb, refreshToken, refreshTokenCallback) => {
		apiGeneral.apiFetch('user/me', params, token, cb, eCb, refreshToken, refreshTokenCallback);
	},
};


