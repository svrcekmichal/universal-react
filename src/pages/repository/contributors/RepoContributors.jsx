import React from 'react';
import asyncResolve from 'reasync';
import {shouldLoadRepoAuthor,shouldLoadRepoContributors,loadRepoAuthor,loadRepoContributors} from '../redux';

const preResolve = ({getState,dispatch}) => shouldLoadRepoAuthor(getState()) ? dispatch(loadRepoAuthor('svrcekmichal')) : undefined ;

const deferResolve = ({getState,dispatch}) => shouldLoadRepoContributors(getState()) ? dispatch(loadRepoContributors('svrcekmichal/universal-react')) : undefined ;


export const RepoContributors = () => (
    <div className="repo-contributors">
        <h2>Repo Contributors</h2>
    </div>
);

export default asyncResolve(preResolve,deferResolve)(RepoContributors);