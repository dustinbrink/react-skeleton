
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
		this._bind('increment');
	}

	increment() {
		this.setState({
			count: this.state.count + 1
		});
	}

	render() {
		return (
			<div className="like-counter">
				Likes : <span>{this.state.count}</span>
				<div><LikeButton onClick={this.increment} text="Like Me"/></div>
			</div>
		);
	}

}

class LikeButton extends BaseComponent {

	static propTypes = {
		text: React.PropTypes.string.isRequired,
		onClick: React.PropTypes.func.isRequired,
	};

	render() {
		return (
			<button onClick={this.props.onClick}>{this.props.text}</button>
		);
	}

}

export default LikeCounter;