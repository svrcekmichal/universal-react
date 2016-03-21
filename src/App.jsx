import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

import styles from './App.css';

const app = ({ children }) => (
  <div className={styles.container}>
    <Helmet titleTemplate="%s | Universal React by svrcekmichal" />
    <div>
      <Link to={{pathname:"/"}}>Homepage</Link>
      <br />
      <Link to={{pathname:"/repo"}}>Repository</Link>
      <br />
      <Link to={{pathname:"/not-found"}}>Not found</Link>
    </div>
    {children}
  </div>
);

export default app;
