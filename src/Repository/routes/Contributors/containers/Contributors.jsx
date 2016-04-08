import React, { Component } from 'react';
import { compose } from 'redux';
import { preResolve, deferResolve } from 'reasync';
import { shouldLoadRepoAuthor, shouldLoadRepoContributors, loadRepoAuthor, loadRepoContributors } from '../redux';

export class RepoContributors extends Component {
  render() {
    return (
      <div className="repo-contributors">
        <h2>Repo Contributors</h2>
      </div>
    )
  }
}

export default compose(
  preResolve(({ getState, dispatch }) => shouldLoadRepoAuthor(getState()) ? dispatch(loadRepoAuthor('svrcekmichal')) : undefined),
  deferResolve(({ getState, dispatch }) => shouldLoadRepoContributors(getState()) ? dispatch(loadRepoContributors('svrcekmichal/universal-react')) : undefined)
)(RepoContributors)
