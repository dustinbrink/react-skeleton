import React from 'react';
import {render} from 'react-dom';

import AwesomeComponent from './AwesomeComponent.jsx';

require('./main.css');


class App extends React.Component {
	render () {
		return (
			<div>
				<p> Hello World!</p>
				<AwesomeComponent />
			</div>
		);
	}
}

render(<App/>, document.getElementById('app'));
