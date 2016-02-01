import React from 'react';
import Helmet from 'react-helmet';
import {Link, AzetLink} from 'react-router';
import {connect} from 'react-redux';
import connectData from 'redux-simple-fetch';

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
)

/************************************************************************/

const mapStateToProps = (state) => {
  const {location} = state.routing;
  return {
    route:location.pathname + location.search
  }
}

export const connectedApp =  connect(mapStateToProps)(app);

/************************************************************************/

function loadCategories() {
  return {
    types: ['LOAD', 'LOAD_SUCCESS', 'LOAD_FAIL'],
    payload: {
      promise: (client) => client.get('http://svrcek.forum-api.azet.dev/forum/api/categories')
    },
    meta: {
      client:true,
      jsonApi:true
    }
  }
}

function loadTopics() {
  return {
    types: ['LOAD', 'LOAD_SUCCESS', 'LOAD_FAIL'],
    payload: {
      promise: (client) => client.get('http://svrcek.forum-api.azet.dev/forum/api/topics')
    },
    meta: {
      client:true,
      jsonApi:{
        category:'forum_topic_category',
        answers:'forum_topic_answer'
      }
    }
  }
}


const prefetch = ({getState, dispatch}) => {
  return Promise.all([
    dispatch(loadCategories()),
    dispatch(loadTopics())
  ]);
};

export default connectData(prefetch)(connectedApp);
