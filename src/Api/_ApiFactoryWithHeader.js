import axios from 'axios';
import qs from 'querystringify';
import { assign, clone, forIn } from 'lodash-es';
import { BASE_URL, WEB_CLIENT_CREDENTIAL_TOKEN } from '../Redux/Constant/ServerConstant';
import { refreshToken } from '../Util/AuthService';

const urlModifier = url => `${BASE_URL}/${url}`;

let accessToken = null;

const setAccessToken = (token) => {
  accessToken = token;
};

function getAuthorizationHeader() {
  return accessToken ? `Bearer ${accessToken}` : `Basic ${WEB_CLIENT_CREDENTIAL_TOKEN}`;
}

function requestWithAuthHeaders(url, options, hasCustomContentType) {
  const headers = {
    Authorization: getAuthorizationHeader(),
    Accept: 'application/json',
    ...options.headers
  };
  if (!hasCustomContentType && options.data != null && options.data !== '') {
    headers['Content-Type'] = 'application/json';
  }
  const requestConfig = { url: urlModifier(url), headers, ...options };
  const originalRequest = axios(requestConfig);
  if (!accessToken) {
    return originalRequest;
  }
  return originalRequest.catch(error => {
    // only do refresh token and retry if the request error is due to expired token
    if (!accessToken || !error || !error.response || error.response.status !== 401) {
      throw error;
    }

    return refreshToken().then(() => {
      let retryRequestConfig = clone(requestConfig);
      retryRequestConfig.headers = assign({},
        requestConfig && requestConfig.headers,
        {
          Authorization: getAuthorizationHeader()
        }
      );
      return axios(retryRequestConfig);
    }).catch(refreshOrSecondRequestError => {
      // reject the request with the original error since the caller usually
      // want to know the error related to the request they made.
      // TODO: find a way to add the refreshOrSecondRequestError in the error object.
      console.log(refreshOrSecondRequestError);
      throw error;
    })
  });
}

const addHeaders = (url, options) => requestWithAuthHeaders(url, options);

const xhrWithPayload = method => (url, payload, cancelToken) => addHeaders(url, {
  cancelToken,
  method,
  data: JSON.stringify(payload)
}).then((response) => {
  let data;
  if (response.status === 204 && !response.data) {
    data = null;
  } else {
    data = response.data;
  }
  return data;
});

const xhrWithoutPayload = method => (url, params, extraParams, cancelToken) => {
  const hasQuestionMark = url.indexOf('?') !== -1;
  let resultUrl = url;
  const query = qs.stringify(params);
  if (query.length > 0) {
    resultUrl += (hasQuestionMark ? '&' : '?') + query;
  }
  if (extraParams != null && extraParams !== '') {
    resultUrl += extraParams;
  }
  return addHeaders(resultUrl, {
    cancelToken,
    method
  })
    .then((response) => {
      let data;
      if (response.status !== 204) {
        data = response.data;
        //const totalItems = response.headers['Content-Length'];
        //data = totalItems ? { data: response.data, total_items: totalItems } : response.data;
        const range = response.headers['content-range'];
        if (range) {
          const rangeMatched = range.match(/\/(.*)/);
          const total = +rangeMatched[1];
          if (total || total === 0) {
            data.total = total;
          }
        }
      }
      return data;
    });
};

export { setAccessToken };

export const api = {
  get: xhrWithoutPayload('GET'),
  delete: xhrWithoutPayload('DELETE'),
  post: xhrWithPayload('POST'),
  put: xhrWithPayload('PUT'),
  getWithCustomToken: (url, options) => {
    let headers = {
      Authorization: `Basic ${WEB_CLIENT_CREDENTIAL_TOKEN}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...options.headers
    };
    return addHeaders(url, {
      method: 'GET',
      headers
    });
  },
  putWithCustomToken: (url, data, options) => {
    let headers = {
      Authorization: `Basic ${WEB_CLIENT_CREDENTIAL_TOKEN}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...options.headers
    };
    return addHeaders(url, {
      method: 'PUT',
      headers,
      data: JSON.stringify(data)
    });
  },
  postUrlFormEncoded: (url, data, options) => {
    const formData = qs.stringify(data);
    return addHeaders(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...options.headers
      },
      data: formData
    }).then(response => response.data);
  },
  postMultipart: (url, data, options) => {
    const formData = new FormData();
    forIn(data, (value, key) => {
      if (value !== null) {
        formData.append(key, value);
      }
    });
    return addHeaders(url, {
      method: 'POST',
      headers: {
        Accept: 'multipart/form-data',
        'Content-Type': 'multipart/form-data',
        'Accept-Encoding': 'gzip',
        ...options.headers
      },
      data: formData
    });
  },
  putMultipart: (url, data, options) => {
    const formData = new FormData();
    forIn(data, (value, key) => {
      if (value !== null) {
        formData.append(key, value);
      }
    });
    return addHeaders(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept-Encoding': 'gzip',
        ...options.headers
      },
      data: formData
    });
  },
  getXlsxFile: (url, options) => {
    let headers = {
      Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Type': 'text/plain'
    };
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
    return requestWithAuthHeaders(url, {
      method: 'GET',
      headers,
      responseType: 'blob', // this must be set before ...options since options may include custom responseType for xls preview
      ...options,
    }, true);
  },
};
