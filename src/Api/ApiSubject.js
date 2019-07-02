import { apiGeneral } from './_General';

export const apiSubject = {

	// REAL
	getSimpleSubject: (url, params, token, cb, eCb) => {
		apiGeneral.apiFetch(url, params, token, cb, eCb);
	}
};