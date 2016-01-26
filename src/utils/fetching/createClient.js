import axios from 'axios';

export default function({getState}) {
  const i9 = getState().auth && getState().auth.i9;
  return client(i9)
}

function client(i9) {
  let client = null;

  function createClient() {
    if(client !== null) {
        return client;
    }

    return client = axios.create({
      params: {i9},
      responseType: 'json'
    })

  }

  return createClient();
}
