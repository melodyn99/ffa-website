// import Base64 from '../../Util/Base64';
import btoa from 'btoa';

const WEB_CLIENT_ID = '3tTftq0Qig88unYH';
const WEB_CLIENT_SECRET = 'g02Zu0EGCySAoRnR0JWASs8hnUWt8n7LRmxMJ5oVmDvF0RqGwrZ4NhRCdVPzeZPy';

export const BASE_URL = 'https://api.fablead.joyaethercloud.com/fablead-server';
// Non-secure: http://ec2-54-169-93-233.ap-southeast-1.compute.amazonaws.com/fablead-server
// Secure: https://api.fablead.joyaethercloud.com/fablead-server

export const WEB_CLIENT_CREDENTIAL_TOKEN = btoa(`${WEB_CLIENT_ID}:${WEB_CLIENT_SECRET}`);

export const AUDIENCE = 'fablead.joyaether.com';
