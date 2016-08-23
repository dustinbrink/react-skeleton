
import React from 'react';

// Components
import BaseComponent from '../BaseComponent.jsx';

// Stylesheets
require('./likeCounter.scss');

class LikeCounter extends BaseComponent {
	
	static propTypes = {
		count: React.PropTypes.number
	};

	static defaultProps = {
		count: 1
	};

	constructor(props) {
		super(props);
		this.state = {
			count: 0
		};
		this._bind('incrementCount');
	}

	incrementCount() {
		this.setState({
			count: this.state.count + 1
		});
	}

	render() {
		return (
			<div className="like-counter">
				Likes : <span>{this.state.count}</span>
				<div><button onClick={this.incrementCount} className="pure-button">Like Me</button></div>
			</div>
		);
	}

}

export default LikeCounter;