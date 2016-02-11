import React from 'react';
import Helmet from 'react-helmet';
import {Link, AzetLink} from 'react-router';
import {connect} from 'react-redux';
import asyncResolve from 'reasync';
import {loadRepo, loadRepoContributors} from 'redux/modules/repo'

const preResolve = () => new Promise((resolve) => setTimeout(resolve,2000));

const deferResolve = ({dispatch}) => {
    return Promise.all([
        dispatch(loadRepo('svrcekmichal/universal-react')),
        dispatch(loadRepoContributors('svrcekmichal/universal-react'))
    ]);
};

const app = ({children,route}) => (
  <div className="app--container">
    <div className="app--nav">
      <Link to={{pathname:"/"}} >Homepagee</Link>
      <Link to={{pathname:"/page1"}} >Page1</Link>
      <Link to={{pathname:"/page2"}} >Page2</Link>
      <Link to={{pathname:"/not-found"}} >Not found</Link>
    </div>

    <img src={require('./favicon.png')} />
    {/*<Helmet {...config.tags}/>*/}
    {children}
    <h2>Current route: {route}</h2>
  </div>
);

const mapStateToProps = (state) => {
  const {location} = state.routing;
  return {
    route:location
  }
};

export const connectedApp = connect(mapStateToProps)(app);

export default asyncResolve(preResolve,deferResolve)(connectedApp);
