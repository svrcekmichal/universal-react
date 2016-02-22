import React from 'react';
import asyncResolve from 'reasync';
import Helmet from 'react-helmet';
import {shouldLoadRepo,loadRepo} from './redux'
import {Link} from 'react-router'

const preResolve = ({getState,dispatch}) => shouldLoadRepo(getState()) ? dispatch(loadRepo('svrcekmichal/universal-react')) : undefined;

const Repo = ({children}) => (
    <div className="repository">
        <Helmet title="repository Page" />

        <h1>Repository</h1>
        <ul className="nav">
            <Link to={{pathname:"/repo"}} >BaseInfo</Link>
            <span> </span>
            <span> </span>
            <Link to={{pathname:"/repo/author"}} >Author</Link>
            <span> </span>
            <span> </span>
            <Link to={{pathname:"/repo/contributors"}} >Contributors</Link>
        </ul>

        {children}

        <p>Info: Before entering any of repo routes, info about repository will be fetched</p>
        <p>If you enter <b>/repo/author</b> route, author will be fetched after router transition</p>
        <p>If you enter <b>/repo/contributors</b> author will be fetched before transition and contributors after transition</p>
    </div>
);

export default asyncResolve(preResolve)(Repo);
