import clientMiddleware,{onSuccess} from 'redux-axios-middleware';
import jsonApiMiddleware from './jsonApiMiddleware';
import transactionMiddleware from './transactionMiddleware';

import createClient from 'utils/createClient';

export default [
  transactionMiddleware,
  clientMiddleware({ client:createClient() }),
  jsonApiMiddleware
];
