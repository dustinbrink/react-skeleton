
import React from 'react';

// Components
import BaseComponent from '../BaseComponent.jsx';
import { Link } from 'react-router'

// Stylesheets
require('./siteHeader.scss');

class SiteHeader extends BaseComponent {

	render() {
		return (
			<div className="site-header">
				<a href="#">Dustin Brink</a>
				<MenuList items={['News', 'Sports', 'Finance']}/>
			</div>
		);
	}

}

class MenuList extends BaseComponent {

	static propTypes = {
		items: React.PropTypes.arrayOf(React.PropTypes.string)
	};

	render() {
		let items = this.props.items.map((item, i) => {
			return <MenuItem text={item} key={i}/>;
		});

		return (
			<ul>
				{items}
			</ul>
		);
	}

}

class MenuItem extends BaseComponent {

	static propTypes = {
		text: React.PropTypes.string.isRequired,
	};

	render() {
		return (
			<li>
				<Link to={this.props.text} >{this.props.text}</Link>
			</li>
		);
	}

}

export default SiteHeader;