import { clone, isFunction, isString } from 'lodash-es';
import qs from 'qs';

import * as Config from '../config';

/**
 * Make request to server API using fetch API. See
 * <https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch>
 * for detail of options parameter and return value.
 * 
 * @param endpoint {!string} Endpoint of the API (should be relative url)
 * @param options {?object} - Option object passed to fetch API.
 * @param accessToken {?string} - Bearer token of Authorization header
 * @return {Promise<Response>} A Promise that resolves to a Response object.
 */
export function request(endpoint, options, accessToken) {
    let fetchOptions = options;
    if (accessToken != null && accessToken !== '') {
        fetchOptions = clone(options) || {};
        fetchOptions.headers = options && options.headers ? new Headers(options.headers) : new Headers();
        fetchOptions.headers.set('Authorization', 'Bearer ' + accessToken);
    }
    return fetch(Config.API_URL + endpoint, fetchOptions);
}

let refreshingTokenPromises = {};

/**
 * Refresh the token and get the new access token and refresh token.
 * To prevent the same token refresh multiple times only a single request
 * can be run concurrently for the same refresh token string.
 * 
 * @param refreshTokenString {!string} Refresh token string
 * @return {Promise<any>} A Promise that resolves to a object which should
 * contains the new access_token and refresh_token attributes.
 * If the input refresh token string is refreshing then return the
 * Promise of the refreshing token.
 * If the refresh token request failed then the promise is rejected with
 * either the response object or the error object of the network error. 
 */
export function refreshToken(refreshTokenString) {
    let refreshingPromise = refreshingTokenPromises[refreshTokenString];
    if (!refreshingPromise) {
        refreshingTokenPromises[refreshTokenString] = refreshingPromise = fetch(Config.API_URL + 'auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + window.btoa(Config.CLIENT_ID + ':' + Config.CLIENT_SECRET)
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                audience: Config.AUDIENCE,
                refresh_token: refreshTokenString
            })
        }).then(response => {
            if (!response.ok) {
                throw response;
            }
            return response.json();
        }).finally(() => {
            delete refreshingTokenPromises[refreshTokenString];
        });
    }
    return refreshingPromise;
}

/**
 * Make request to server API.
 * 
 * If refreshToken is provided then the function will refresh the token and
 * retry the request request with the new access token when the first request failed.
 * 
 * @param endpoint {!string} Endpoint of the API (should be relative url)
 * @param options {?object} - Option object.
 * @param options.method {string='GET'} - Request method. Default is 'GET'.
 * @param options.params {?string|object} - Query parameter for the url.
 * Note that 'params' parameter is required for DELETE requests.
 * @param options.body {?Blob|BufferSource|FormData|URLSearchParams|string|object} -
 * Request body object. Usually for POST and PUT requests.
 * @param options.callback {?function} - Callback to be called when request is succeeded.
 * @param options.errorCallback {?function} - Callback to be called when request is failed.
 * @param options.accessToken {?string} - Bearer token of Authorization header
 * @param options.refreshToken {?string} - Refresh token to be used
 * when access token need to be refreshed.
 * @param options.refreshTokenCallback {?function} - Callback to be called
 * after token is refreshed successfully.
 * @return {Promise<Response>} A Promise that resolves to a Response object.
 * This can be either the response of the first or the retried request.
 * If both requests failed then it resolved to the first response.
 * Error of both refresh token request or retried request are only printed to console log.
 */
export function apiRequest(endpoint, options) {
    const {
        method,
        params,
        body,
        callback,
        errorCallback,
        accessToken,
        refreshToken: refreshTokenString,
        refreshTokenCallback
    } = (options || {});

    // add query params to url
    let url = endpoint;
    if (params != null && params !== '') {
        if (isString(params)) {
            url = endpoint + params;
        } else {
            const paramsStr = qs.stringify(params, {
                indices: false
            });
            if (paramsStr) {
                const hasQuestionMark = /\?/.test(endpoint);
                url = endpoint + (hasQuestionMark ? '&' : '?') + paramsStr;
            }
        }
    } else if ((/delete/i).test(method)) {
        return Promise.reject(new Error("'params' parameter is required for DELETE requests."));
    }

    // build request header and request options
    const headers = new Headers({
        'Accept': 'application/json'
    });
    const requestOptions = { headers };
    if (body != null && body !== '') {
        if (body instanceof Blob ||
            // body instanceof BufferSource ||
            body instanceof FormData ||
            body instanceof URLSearchParams ||
            isString(body)
        ) {
            requestOptions.body = body;
        } else {
            headers.set('Content-Type', 'application/json');
            requestOptions.body = JSON.stringify(body);
        }
    }
    if (method) {
        requestOptions.method = method;
    }

    // Send network request and retry request if access token is expired.
    // Retry request is done only if both access token and refresh token is provided.
    const requestResult = request(url,
        requestOptions,
        accessToken
    ).then(async (firstRequestResponse) => {
        let result = firstRequestResponse;
        if (accessToken && refreshTokenString && firstRequestResponse.status === 401) {
            // all errors occurred in refreshing token and second request are only logged
            // so only the error for the first request is passed to caller since the caller usually
            // want to know the error related to the request they made.
            try {
                const refreshTokenJson = await refreshToken(refreshTokenString);
                try {
                    const newAccessToken = refreshTokenJson.access_token;
                    const secondRequestResponse = await request(url,
                        requestOptions,
                        newAccessToken
                    );
                    if (secondRequestResponse.ok) {
                        result = secondRequestResponse;
                    } else {
                        console.log('second request failed: ', secondRequestResponse);
                        // result = firstRequestResponse;
                    }
                } finally {
                    if (isFunction(refreshTokenCallback)) {
                        try {
                            refreshTokenCallback(refreshTokenJson);
                        } catch (refreshTokenCallbackError) {
                            console.log('error thrown from refreshTokenCallback: ', refreshTokenCallbackError);
                        }
                    }
                }
            } catch (refreshOrSecondRequestError) {
                console.log('refresh token or second request error: ', refreshOrSecondRequestError);
                // result = firstRequestResponse;
            }
        }

        return result;
    });

    // Invoke callback and errorCallback.
    // The whole request is considered successful
    // if the retried requset is succeeded.
    if (isFunction(callback)) {
        requestResult.then(response => {
            return response.json().then(data => {
                callback({ status: response.status, body: data });
            });
        });
    }
    requestResult.catch(errorCallback);

    return requestResult;
}



// explanation of function parameters of below CRUD functions:
// endpoint {!string} - Endpoint of the API (should be relative url)
// params {?string|object} - Query parameter for the url.
// body {?Blob|BufferSource|FormData|URLSearchParams|string|object} - Request body object. Usually for POST and PUT requests.
// accessToken {?string} - Bearer token of Authorization header
// callback {?function} - Callback to be called when request is succeeded.
// errorCallback {?function} - Callback to be called when request is failed.
// refreshToken {?string} - Refresh token to be used when access token need to be refreshed.
// refreshTokenCallback {?function} - Callback to be called after token is refreshed successfully.
//
// If refreshToken is provided then the function will refresh the token and
// retry the request request with the new access token when the first request failed.


function apiFetch(endpoint, params, accessToken, callback, errorCallback, refreshToken, refreshTokenCallback) {
    apiRequest(endpoint, {
        method: 'GET',
        params,
        callback,
        errorCallback,
        accessToken,
        refreshToken,
        refreshTokenCallback
    });
}

function apiDelete(endpoint, params, accessToken, callback, errorCallback, refreshToken, refreshTokenCallback) {
    apiRequest(endpoint, {
        method: 'DELETE',
        params,
        callback,
        errorCallback,
        accessToken,
        refreshToken,
        refreshTokenCallback
    });
}

function apiPost(endpoint, body, accessToken, callback, errorCallback, refreshToken, refreshTokenCallback) {
    apiRequest(endpoint, {
        method: 'POST',
        body,
        callback,
        errorCallback,
        accessToken,
        refreshToken,
        refreshTokenCallback
    });
}

function apiPut(endpoint, body, accessToken, callback, errorCallback, refreshToken, refreshTokenCallback) {
    apiRequest(endpoint, {
        method: 'PUT',
        body,
        callback,
        errorCallback,
        accessToken,
        refreshToken,
        refreshTokenCallback
    });
}

export const apiGeneral = {
    apiFetch,
    apiDelete,
    apiPost,
    apiPut
};
