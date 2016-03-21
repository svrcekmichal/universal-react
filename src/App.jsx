import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import styles from './App.css';

export default class App extends Component {
  render(){
    return(
      <div className={styles.container}>
        <Helmet titleTemplate="%s | Universal React by svrcekmichal" />
        <div>
          <Link to={{pathname:"/"}}>Homepage</Link>
          <br />
          <Link to={{pathname:"/repo"}}>Repository</Link>
          <br />
          <Link to={{pathname:"/not-found"}}>Not found</Link>
        </div>
        {this.props.children}
      </div>
    )
  }
}
