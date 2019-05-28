import { CacheService } from './CacheService';
import { apiAuth } from '../Api/ApiAuth';
import { setAccessToken } from '../Api/_ApiFactoryWithHeader';

// Contains functions for authentication service. Considered as helper.

let interval = null;
let refreshingTokenPromise = null;

export function refreshToken() {
  if (!refreshingTokenPromise) {
    const refToken = CacheService.getAuthData().refresh_token;
    refreshingTokenPromise = apiAuth.refreshToken(refToken).then((resp) => {
      return Promise.all([
        setAccessToken(resp.access_token),
        CacheService.saveAuthData(resp)
      ]).then(() => {
        refreshingTokenPromise = null;
        return resp;
      });
    }).catch(e => {
      refreshingTokenPromise = null;
      throw e;
    });
  }
  return refreshingTokenPromise;
}

export function clearLoginData() {
  const accessToken = CacheService.getAuthData().access_token;
  return Promise.all([
    apiAuth.revokeToken(accessToken),
    setAccessToken(null),
    CacheService.clearAuthData(),
    CacheService.clearProfileData()
  ]).then(results => results[0]);
}

export function clearTokenInterval() {
  if (interval) {
    clearInterval(interval);
  }
}

export function refreshTokenInterval() {
  clearTokenInterval();
  if (CacheService.getAuthData()) {
    interval = setInterval(() => refreshToken(), 36000);
  }
}
