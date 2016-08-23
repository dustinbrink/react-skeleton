// @flow
import React from 'react';
import {render} from 'react-dom';

// Components
import LikeCounter from './components/likeCounter/likeCounter.jsx';
import SiteHeader from './components/siteHeader/siteHeader.jsx';

// Stylesheets
require('./index.scss');

if(process.env.NODE_ENV !== 'production') {
	React.Perf = require('react-addons-perf');
}


class App extends React.Component {
	render (): React.Element {
		return (
			<div>
				<SiteHeader />
				<p> Hello Dustin Brink!</p>
				<LikeCounter />
			</div>
		);
	}
}

render(<App/>, document.getElementById('app'));