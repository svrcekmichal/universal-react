import clientMiddleware from './clientMiddleware';
import jsonApiMiddleware from './jsonApiMiddleware';
import transactionMiddleware from './transactionMiddleware';


export default [
  clientMiddleware,
  transactionMiddleware,
  jsonApiMiddleware
];
