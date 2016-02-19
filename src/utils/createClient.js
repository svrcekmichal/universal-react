import axios from 'axios';

export default function client(cookies) {
  let client = null;

  function createClient() {
    if(client !== null) {
        return client;
    }

    return client = axios.create({
      responseType: 'json',
      baseURL:'https://api.github.com/',
      headers:{
        Cookie:createCookieString(cookies)
      }
    })
  }

  function createCookieString(cookies)
  {
    return Object.keys(cookies).reduce((previous,key) => previous + `${key}=${cookies[key]}; ` , '')
  }

  return createClient();
}
