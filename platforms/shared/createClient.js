import axios from 'axios';

export default function create(cookies) {
  let client = null;

  const createCookieString = () => Object.keys(cookies)
    .reduce((previous, key) => `${previous}${key}=${cookies[key]}; `, '');

  if (client !== null) {
    return client;
  }

  const headers = {};
  if (typeof cookies !== 'undefined') {
    headers.Cookie = createCookieString(cookies);
  }

  client = axios.create({
    responseType: 'json',
    baseURL: 'https://api.github.com/',
    headers
  });

  return client;
}
