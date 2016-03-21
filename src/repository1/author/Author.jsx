import React from 'react';
import { defer } from 'reasync';
import { shouldLoadRepoAuthor, loadRepoAuthor } from '../redux';

const deferResolve = ({ getState, dispatch }) => shouldLoadRepoAuthor(getState()) ? dispatch(loadRepoAuthor('svrcekmichal')) : undefined;

export const RepoContributors = () => (
  <div className="repo-author">
    <h2>Repo Author</h2>
  </div>
);

export default defer(deferResolve)(RepoContributors);