import clientMiddleware,{onSuccess} from 'redux-axios-middleware';
import jsonApiMiddleware from './jsonApiMiddleware';

import createClient from 'utils/createClient';

export default [
  clientMiddleware({ client:createClient() }),
  jsonApiMiddleware
];
