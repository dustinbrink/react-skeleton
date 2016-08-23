

import React from 'react';

// Stylesheets
require('./siteHeader.scss');

class SiteHeader extends React.Component {
	static defaultProps: { visited: boolean };

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="site-header pure-menu pure-menu-horizontal">
				<a href="#" className="pure-menu-heading pure-menu-link">Dustin Brink</a>
				<ul className="pure-menu-list">
						<li className="pure-menu-item">
							<a href="#" className="pure-menu-link">News</a>
						</li>
						<li className="pure-menu-item">
							<a href="#" className="pure-menu-link">Sports</a>
						</li>
						<li className="pure-menu-item">
							<a href="#" className="pure-menu-link">Finance</a>
						</li>
				</ul>
			</div>
		);
	}

}

export default SiteHeader;