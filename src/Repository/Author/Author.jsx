import React, { Component } from 'react';
import { defer } from 'reasync';
import { shouldLoadRepoAuthor, loadRepoAuthor } from '../redux';

const deferResolve = ({ getState, dispatch }) => shouldLoadRepoAuthor(getState()) ? dispatch(loadRepoAuthor('svrcekmichal')) : undefined;

export class RepoAuthor extends Component {
  render(){
    return (
      <div className="repo-author">
        <h2>Repo Author</h2>
      </div>
    )
  }
}

export default defer(deferResolve)(RepoAuthor);
