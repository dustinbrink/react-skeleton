
import React from 'react';

// Components
import BaseComponent from '../BaseComponent.jsx';

// Stylesheets
require('./todo.scss');

class Todo extends BaseComponent {
	
	render() {
		return (
			<div className="todo">
				TODO: Create this component
			</div>
		);
	}

}


export default Todo;