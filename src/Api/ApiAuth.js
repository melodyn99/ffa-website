import { api } from './_ApiFactoryWithHeader';
import { AUDIENCE, WEB_CLIENT_CREDENTIAL_TOKEN } from '../Redux/Constant/ServerConstant';

let refreshingTokenPromise = null;

export const apiAuth = {
  authenticate: (username, password) => api.postUrlFormEncoded('auth', {
    username, password, audience: AUDIENCE, grant_type: 'password',
  }, { headers: { Authorization: `Basic ${WEB_CLIENT_CREDENTIAL_TOKEN}` } }),

  // make sure refreshToken will not be refreshed multiple times in parallel
  refreshToken: refreshToken => {
    if (!refreshingTokenPromise) {
      refreshingTokenPromise = api.postUrlFormEncoded('auth', {
        grant_type: 'refresh_token',
        audience: AUDIENCE,
        refresh_token: refreshToken
      }, {
        headers: {
          Authorization: `Basic ${WEB_CLIENT_CREDENTIAL_TOKEN}`
        }
      }).then(result => {
        refreshingTokenPromise = null;
        return result;
      }, error => {
        refreshingTokenPromise = null;
        throw error;
      });
    }
    return refreshingTokenPromise;
  },

  clientCredential: username => api.postUrlFormEncoded('auth', { grant_type: 'client_credentials', audience: username },
    { headers: { Authorization: `Basic ${WEB_CLIENT_CREDENTIAL_TOKEN}` } }),

  revokeToken: accessToken => {
    return api.postUrlFormEncoded('token/revoke', {
      token: accessToken
    }, {
      headers: {
        Authorization: `Basic ${WEB_CLIENT_CREDENTIAL_TOKEN}`
      }
    });
  }
};
