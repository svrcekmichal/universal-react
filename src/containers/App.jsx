import React from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import {loadRepo, loadRepoContributors} from 'redux/modules/repo'

const app = ({children}) => (
  <div className="app--container">
    <Helmet
        titleTemplate="%s | Universal React by svrcekmichal"
    />

    <div className="app--nav">
      <Link to={{pathname:"/"}} >Homepage</Link>
      <br/>
      <Link to={{pathname:"/delay"}} >Prefetch with 2sec delay</Link>
      <br/>
      <Link to={{pathname:"/delay-with-fetch"}} >Page2</Link>
      <br/>
      <Link to={{pathname:"/not-found"}} >Not found</Link>
    </div>

    {/*<Helmet {...config.tags}/>*/}
    {children}
  </div>
);

export default app;
