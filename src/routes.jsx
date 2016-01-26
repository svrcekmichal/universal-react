import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from 'containers/App';
import Homepage from 'containers/Homepage';
import Page1 from 'containers/Page1';
import Page2 from 'containers/Page2';
import NotFound404 from 'containers/404';

export const getRoutes = ({getState}) => {
  return (
    <Route component={App} path="/">

      <IndexRoute component={Homepage} />

      <Route component={Page1} path="page1" />
      <Route component={Page2} path="page2" />

      <Route component={NotFound404} path="*" />
    </Route>
  )
}
