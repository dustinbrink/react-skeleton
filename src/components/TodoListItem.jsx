// @flow
import React from 'react';
import autobind from 'autobind-decorator';

export type TodoType = {
	id: string,
	text: string,
	completed: boolean
};

type PropsType = {
	todo: TodoType,
	onComplete: (todo: TodoType) => any,
};

class TodoListItem extends React.Component {
	props: PropsType;

	@autobind
	_handleComplete(): void {
		this.props.onComplete(this.props.todo)
	}

	render(): React.Element {
		return (
			<div>
				<h3>{this.props.todo.text}</h3>
				<button onClick={this._handleComplete}>Complete</button>
			</div>
		)
	}
}

export default TodoListItem;