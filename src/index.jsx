
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router'

// Components
import BaseComponent from './components/BaseComponent.jsx';
import SiteHeader from './components/siteHeader/siteHeader.jsx';
import LikeCounter from './components/likeCounter/likeCounter.jsx';
import TodoList from './components/todoList/todoList.jsx';

// Stylesheets
require('./index.scss');

if(process.env.NODE_ENV !== 'production') {
	React.Perf = require('react-addons-perf');
}

const Nav = [
	{ path: 'Like', component: LikeCounter, text: 'Like Counter'},
	{ path: 'Todo', component: TodoList, text: 'Todo List'},
]

class App extends BaseComponent {

	render() {
		return (
			<div>
				<SiteHeader nav={Nav}/>
				{this.props.children}
			</div>
		);
	}

}

const Routes = {
	path: '/',
	component: App,
	indexRout: { component: TodoList },
	childRoutes: Nav
}

render(<Router history={browserHistory} routes={Routes} />, document.getElementById('app'));