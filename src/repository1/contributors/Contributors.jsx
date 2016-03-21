import React from 'react';
import { pre, defer } from 'reasync';
import { shouldLoadRepoAuthor, shouldLoadRepoContributors, loadRepoAuthor, loadRepoContributors } from '../redux';

const preResolve = ({ getState, dispatch }) => shouldLoadRepoAuthor(getState()) ? dispatch(loadRepoAuthor('svrcekmichal')) : undefined;

const deferResolve = ({ getState, dispatch }) => shouldLoadRepoContributors(getState()) ? dispatch(loadRepoContributors('svrcekmichal/universal-react')) : undefined;

export const RepoContributors = () => (
  <div className="repo-contributors">
    <h2>Repo Contributors</h2>
  </div>
);

const PreRepoContributors = pre(preResolve)(RepoContributors);
export default defer(deferResolve)(PreRepoContributors);
