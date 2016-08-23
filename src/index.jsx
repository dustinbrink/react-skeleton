// @flow
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'

// Components
import BaseComponent from './components/BaseComponent.jsx';
import SiteHeader from './components/siteHeader/siteHeader.jsx';
import LikeCounter from './components/likeCounter/likeCounter.jsx';
import Todo from './components/todo/todo.jsx';

// Stylesheets
require('./index.scss');

if(process.env.NODE_ENV !== 'production') {
	React.Perf = require('react-addons-perf');
}

class App extends BaseComponent {
	render (): React.Element {
		return (
			<div>
				<SiteHeader />
				{this.props.children}
			</div>
		);
	}
}

render((
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<Route path="News" component={LikeCounter}/>
			<Route path="Sports" component={Todo}/>
		</Route>
	</Router>
), document.getElementById('app'));