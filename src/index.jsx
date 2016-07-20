// @flow
import React from 'react';
import {render} from 'react-dom';

import AwesomeComponent from './components/AwesomeComponent.jsx';
import TodoList from './components/TodoList.jsx';

if(process.env.NODE_ENV !== 'production') {
	React.Perf = require('react-addons-perf');
}

var todos = [
	{
		id: '1',
		text: 'string',
		completed: false
	}
];

class App extends React.Component {
	render (): React.Element {
		return (
			<div>
				<p> Hello Dustin!</p>
				<AwesomeComponent />
				<TodoList 
					todos={todos}
				/>
			</div>
		);
	}
}

render(<App/>, document.getElementById('app'));