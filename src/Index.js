import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './scripts/App.jsx';
import Lists from './scripts/Lists.jsx';
import Snaps from './scripts/Snaps.jsx';

window.React = React;

render(
    (
	    <Router history={hashHistory}>
	        <Route path="/" component={App} />
	        <Route path="lists" component={Lists} />
	        <Route path="lists/:id" component={Snaps} />
	    </Router>
    ), document.getElementById('content')
);
