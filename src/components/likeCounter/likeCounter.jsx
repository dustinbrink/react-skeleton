import React from 'react';

// Stylesheets
require('./likeCounter.scss');

class LikeCounter extends React.Component {
	static defaultProps: { visited: boolean };

	constructor(props) {
		super(props);
		this.state = {likesCount : 0};
		this.onLike = this.onLike.bind(this);
	}

	onLike () {
		let newLikesCount = this.state.likesCount + 1;
		this.setState({likesCount: newLikesCount});
	}

	render() {
		return (
			<div className="like-counter">
				Likes : <span>{this.state.likesCount}</span>
				<div><button onClick={this.onLike} className="pure-button">Like Me</button></div>
			</div>
		);
	}

}

export default LikeCounter;