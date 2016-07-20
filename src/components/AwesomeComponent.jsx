// @flow
import React from 'react';

class AwesomeComponent extends React.Component {
	static defaultProps: { visited: boolean };

	constructor(props: any): void {
		super(props);
		this.state = {likesCount : 0};
		this.onLike = this.onLike.bind(this);
	}

	onLike (): void {
		let newLikesCount = this.state.likesCount + 1;
		this.setState({likesCount: newLikesCount});
	}

	render(): React.Element {
		return (
			<div>
				Likes : <span>{this.state.likesCount}</span>
				<div><button onClick={this.onLike} className="pure-button">Like Me</button></div>
			</div>
		);
	}

}

export default AwesomeComponent;