
import React from 'react';

// Components
import BaseComponent from '../BaseComponent.jsx';

// Stylesheets
require('./todoList.scss');

class TodoList extends BaseComponent {
	
	render() {
		return (
			<div className="todo">
				TODO: Create this component
			</div>
		);
	}

}


export default TodoList;