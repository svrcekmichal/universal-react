import React from 'react';
import asyncResolve from 'reasync';

const preResolve = () => new Promise((resolve) => setTimeout(resolve,2000));

const delayedPage = () => (
    <div>
        <h1 className="page1">Delayed page</h1>
        <p>rendering of this page was delayed by 2sec</p>
    </div>
);

export default asyncResolve(preResolve)(delayedPage);
