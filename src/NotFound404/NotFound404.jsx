import React, { Component } from 'react';
import Helmet from 'react-helmet';

export default class NotFound404 extends Component {
  render(){
    return (
      <div className="404">
        <Helmet title="404 Not Found" />
        <h1>404 NOT FOUND</h1>
      </div>
    );
  }
}
