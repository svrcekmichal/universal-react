import React from 'react';
import asyncResolve from 'reasync';
import {loadRepo,loadRepoContributors} from '../redux/modules/repo'

const preResolve = () => new Promise((resolve) => setTimeout(resolve,500));

const deferResolve = ({dispatch}) => Promise.all([
    dispatch(loadRepo('svrcekmichal/universal-react')),
    dispatch(loadRepoContributors('svrcekmichal/universal-react'))
]);

const delayedPageWithFetch = () => (
    <div>
        <h1 className="page1">Delayed page</h1>
        <p>rendering of this page was delayed by 0.5sec</p>
        <p>After prefetching finished:</p>
        <ul>
            <li>on server page make two request on github and after they are resolved render</li>
            <li>on client page is rendered in parallel with 2 request on github api</li>
        </ul>
    </div>
);

export default asyncResolve(preResolve,deferResolve)(delayedPageWithFetch);
