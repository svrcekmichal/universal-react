import React from 'react';

import Repository from './Repository';
import BaseInfo from './BaseInfo/BaseInfo'
import Contributors from './Contributors/Contributors';
import Author from './Author/Author';

export const getRoutes = () => ({
  component:Repository,
  indexRoute:BaseInfo,
  childRoutes:[{
    path:'author',
    component:Author
  },{
    path:'contributors',
    component:Contributors
  }]
});
