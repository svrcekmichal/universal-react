import React from 'react';

export default (prefetch, defer) => {
  return WrappedComponent => {
    const ConnectData = (props) => (
      <WrappedComponent {...props} />
    )
    ConnectData.prefetchData = prefetch;
    ConnectData.deferData = defer;
    return ConnectData;
  }
}
