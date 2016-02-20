import axios from 'axios';

export default function create(cookies) {
  let client = null;

  function createClient() {
    if(client !== null) {
        return client;
    }

    const headers = {};
    if(typeof cookies !== 'undefined') {
      headers.Cookie = createCookieString(cookies);
    }

    return client = axios.create({
      responseType: 'json',
      baseURL:'https://api.github.com/',
      headers 
    })
  }

  const createCookieString = (cookies) => {
    return Object.keys(cookies).reduce((previous,key) => previous + `${key}=${cookies[key]}; ` , '')
  };

  return createClient();
}
