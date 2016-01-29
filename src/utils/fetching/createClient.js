import axios from 'axios';

export default function client() {
  let client = null;

  function createClient() {
    if(client !== null) {
        return client;
    }

    return client = axios.create({
      responseType: 'json'
    })

  }

  return createClient();
}
