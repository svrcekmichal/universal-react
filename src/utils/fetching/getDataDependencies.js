export default (components, defered = false) => {

  const methodName = defered ? 'deferData' : 'prefetchData';
  return ({getState,dispatch}, location, params) => {
    return components
      .filter(component => component && component[methodName])
      .map(component => component[methodName])
      .map(fetchData => fetchData({getState,dispatch,location,params}))
  }
}
