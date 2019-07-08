import * as Config from "../config";

export const apiGeneral = {

    apiFetch: (url, params, token, callback, errorCallback) => {

        let fullUrl = Config.API_URL + url;

        if (params)
            fullUrl += "?" + buildParam(params);

        // console.log('Full URL : ', fullUrl);

        fetch(fullUrl, {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: null
        })
            .then(r =>
                r.json().then(data => ({ status: r.status, body: data }))
            )
            .then((obj) => {
                // console.log(fullUrl, "success", obj);
                if (typeof (callback) === "function") {
                    callback(obj);
                }
            })
            .catch(error => {
                // console.log(fullUrl, "error", error);
                if (typeof (errorCallback) === "function") {
                    errorCallback(error);
                }
            });
    },

    apiPost: (url, body, token, callback, errorCallback) => {

        let fullUrl = Config.API_URL + url;

        // console.log('Full URL : ', fullUrl);

        fetch(fullUrl, {
            method: 'post',
            headers: new Headers({
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(body)
        })
            .then(r =>
                r.json().then(data => ({ status: r.status, body: data }))
            )
            .then((obj) => {
                // console.log(fullUrl, "success", obj);
                if (typeof (callback) === "function") {
                    callback(obj);
                }
            })
            .catch(error => {
                // console.log(fullUrl, "error", error);
                if (typeof (errorCallback) === "function") {
                    errorCallback(error);
                }
            });
    },

    apiDelete: (url, params, token, callback, errorCallback) => {

        if (!params) {
            return;
        }
        let fullUrl = Config.API_URL + url + "/" + params;

        fetch(fullUrl, {
            method: 'delete',
            headers: new Headers({
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: null
        })
            .then((obj) => {
                // console.log(fullUrl, "success", obj);
                if (typeof (callback) === "function") {
                    callback(obj);
                }
            })
            .catch(error => {
                // console.log(fullUrl, "error", error);
                if (typeof (errorCallback) === "function") {
                    errorCallback(error);
                }
            });
    },

    apiPostRefreshToken: (url, options, token, callback, errorCallback) => {

        let fullUrl = Config.API_URL + url;

        // console.log('Full URL : ', fullUrl);
        // console.log('Headers : ', options.headers);

        fetch(fullUrl, {
            method: 'post',
            // headers: new Headers({
            headers: options.headers,
            // }),
            body: new URLSearchParams({
                'grant_type': 'refresh_token',
                'refresh_token': token
            })
        })
            .then(r =>
                r.json().then(data => ({ status: r.status, body: data }))
            )
            .then((obj) => {
                // console.log(fullUrl, "success", obj);
                if (typeof (callback) === "function") {
                    callback(obj);
                }
            })
            .catch(error => {
                // console.log(fullUrl, "error", error);
                if (typeof (errorCallback) === "function") {
                    errorCallback(error);
                }
            });
    },

}

export const buildParam = (params) => {
    return Object.keys(params).map(k => k + "=" + params[k]).join("&");
}
