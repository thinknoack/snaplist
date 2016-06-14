import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import App from './scripts/App.jsx';

window.React = React;

render(
    (<Router history={hashHistory}>
        <Route path="/" component={App} />
    </Router>), document.getElementById('content')
);
