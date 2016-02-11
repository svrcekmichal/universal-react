import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from 'containers/App';
import Homepage from 'containers/Homepage';
import DelayedPage from 'containers/DelayedPage';
import DelayedWithFetch from 'containers/DelayedWithFetch';
import NotFound404 from 'containers/404';

export const getRoutes = ({getState}) => {
  return (
    <Route component={App} path="/">

      <IndexRoute component={Homepage} />

      <Route component={DelayedPage} path="delay" />
      <Route component={DelayedWithFetch} path="delay-with-fetch" />

      <Route component={NotFound404} path="*" />
    </Route>
  )
}
