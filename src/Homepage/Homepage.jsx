import React, { Component } from 'react';
import Helmet from 'react-helmet';

export default class Homepage extends Component {
  render(){
    return (
      <div className="homepage">
        <Helmet title="Homepage" />
        <h1>Homepagee</h1>
      </div>
    );
  }
}
