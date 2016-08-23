
import React from 'react';

// Components
import BaseComponent from '../BaseComponent.jsx';
import { Link } from 'react-router'

// Stylesheets
require('./siteHeader.scss');

class SiteHeader extends BaseComponent {
	static propTypes = {
		nav: React.PropTypes.arrayOf(React.PropTypes.object)
	};

	render() {
		return (
			<div className="site-header">
				<Link to="/">Dustin Brink</Link>
				<MenuList items={this.props.nav}/>
			</div>
		);
	}

}

class MenuList extends BaseComponent {

	static propTypes = {
		items: React.PropTypes.arrayOf(React.PropTypes.object)
	};

	static defaultProps = {
		items: []
	};

	render() {
		let items = this.props.items.map((item, i) => {
			return <MenuItem nav={item} key={i}/>;
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
		nav: React.PropTypes.object.isRequired,
	};

	render() {
		return (
			<li>
				<Link to={this.props.nav.path} >{this.props.nav.text}</Link>
			</li>
		);
	}

}

export default SiteHeader;