/**
 * Unrestrict XHR:
 */
/* if (__DEV__) {
  GLOBAL.XMLHttpRequest =
    GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
} */

import { forIn } from 'lodash-es';
import qs from 'querystringify';
import q from 'qs';
import { BASE_URL, WEB_CLIENT_CREDENTIAL_TOKEN } from '../Redux/Constant/ServerConstant';

export const baseUrl = `${BASE_URL}/`;

const DEFAULT_HEADERS = {
  Authorization: `Basic ${WEB_CLIENT_CREDENTIAL_TOKEN}`,
  'Cache-Control': 'no-cache',
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const setAccessToken = (token) => {
  DEFAULT_HEADERS.Authorization = `Bearer ${token}`;
};

const setIdToken = () => {
  // idToken = token;
};

const setRefreshToken = () => {
  // refreshToken = token;
};

const api = {
  postAuth: (endpoint, params) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        ...DEFAULT_HEADERS,
        'Content-Type': 'application/json',
      },
    };
    return fetch(baseUrl + endpoint, options).then(result => result.json());
  },

  post: (endpoint: string, params: Object) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        ...DEFAULT_HEADERS,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    return fetch(baseUrl + endpoint, options).then(result => result.json());
  },

  get: (endpoint: string, params) => {
    const options = {
      method: 'GET',
      headers: {
        ...DEFAULT_HEADERS,
        'Content-Type': 'application/json',
      },
    };
    return fetch(`${baseUrl + endpoint}/${qs.stringify(params, true)}`, options)
      .then(result => result.json());
  },

  put: (endpoint: string, params: Object): Promise => {
    const options = {
      method: 'PUT',
      body: JSON.stringify(params),
      headers: {
        ...DEFAULT_HEADERS,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    return fetch(baseUrl + endpoint, options).then(result => result.json());
  },

  putFormData: (endpoint: string, params: Object): Promise => {
    const formData = new FormData();
    forIn(params, (value, key) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    const options = {
      method: 'PUT',
      body: formData,
      headers: {
        ...DEFAULT_HEADERS,
        Accept: 'multipart/form-data',
      },
    };

    return fetch(baseUrl + endpoint, options).then(result => result.json());
  },

  postForm: (endpoint: string, params: Object, extraHeader: Object): Promise => {
    let formBody = [];
    forIn(params, (value, key) => {
      if (value !== null && value !== undefined) {
        const encodedKey = encodeURIComponent(key);
        const encodedValue = encodeURIComponent(params[key]);
        formBody.push(`${encodedKey}=${encodedValue}`);
      }
    });

    formBody = q.stringify(params);

    const options = {
      method: 'POST',
      body: formBody,
      headers: {
        ...DEFAULT_HEADERS,
        ...extraHeader,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        Accept: 'application/json',
      },
    };

    return fetch(baseUrl + endpoint, options).then(result => result.json());
  },

  postFormData: (endpoint: string, params: Object, extraHeader: Object): Promise => {
    const formData = new FormData();
    forIn(params, (value, key) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    const options = {
      method: 'POST',
      body: formData,
      headers: {
        ...DEFAULT_HEADERS,
        ...extraHeader,
        Accept: 'multipart/form-data',
      },
    };

    return fetch(baseUrl + endpoint, options).then(result => result.json());
  },

  delete: (endpoint: string, params: Object): Promise => {
    const options = {
      method: 'DELETE',
      body: JSON.stringify(params),
      headers: {
        ...DEFAULT_HEADERS,
        'Content-Type': 'application/json',
      },
    };
    return fetch(baseUrl + endpoint, options).then(result => result.json());
  },
};

export {
  api, setAccessToken, setIdToken, setRefreshToken,
};
