// import Base64 from '../../Util/Base64';
import btoa from 'btoa';

const WEB_CLIENT_ID = '7S8fkNbU2hkhDBfL';
const WEB_CLIENT_SECRET = 'zeBPWK63QqTFk0IUgCX1XiJez64pOaerbPka0dGMrRpo2u5XtqIe6SnIbvEIiub9';

export const BASE_URL = 'https://api.fablead-fashion-academy.dev.joyaethercloud.com/ffa-server';
// Non-secure: http://ec2-54-169-93-233.ap-southeast-1.compute.amazonaws.com/fablead-server
// Secure: https://api.fablead.joyaethercloud.com/fablead-server

export const WEB_CLIENT_CREDENTIAL_TOKEN = btoa(`${WEB_CLIENT_ID}:${WEB_CLIENT_SECRET}`);

export const AUDIENCE = 'fablead.joyaether.com';
