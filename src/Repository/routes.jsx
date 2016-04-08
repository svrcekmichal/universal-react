import React from 'react';

import Repository from './containers/Repository';
import BaseInfo from 'routes/base-info/containers/BaseInfo'
import Contributors from 'routes/contributors/containers/Contributors';
import Author from 'routes/author/containers/Author';

export const getRoutes = () => ({
  component:Repository,
  indexRoute:BaseInfo,
  childRoutes:[
    { path:'author', component:Author },
    { path:'contributors', component:Contributors }
  ]
});
