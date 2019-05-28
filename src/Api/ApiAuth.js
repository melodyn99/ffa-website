import { api } from './_ApiFactoryWithHeader';
import { AUDIENCE, WEB_CLIENT_CREDENTIAL_TOKEN } from '../Redux/Constant/ServerConstant';

export const apiAuth = {
  authenticate: (username, password) => api.postUrlFormEncoded('auth', {
    username, password, audience: AUDIENCE, grant_type: 'password',
  }, { headers: { Authorization: `Basic ${WEB_CLIENT_CREDENTIAL_TOKEN}` } })
};
