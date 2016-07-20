// @flow
import React from 'react';
import autobind from 'autobind-decorator';
import TodoListItem from './TodoListItem';
import type { TodoType } from './TodoListItem'

type PropsType = {
	todos: Array<TodoType>
};

class TodoList extends React.Component {
	props: PropsType;

	@autobind
	_handleCompleteTodo(id: string): void {
		this.id = id;
	}

	render(): React.Element {
		return (
			<ul>
				{this.props.todos.map((todo: TodoType): void => (
					<li key={todo.id}>
						<TodoListItem
							todo={todo}
							onComplete={this._handleCompleteTodo}
						/>
					</li>
				))}
			</ul>
		)
	}

}

export default TodoList;