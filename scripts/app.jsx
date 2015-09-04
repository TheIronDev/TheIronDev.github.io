
import React from 'react';

import Navigation from './navigation.jsx';
import Home from './home.jsx';

export default React.createClass({
	getInitialState() {
		return {
			activePage: 'Home'
		};
	},
	render() {

		let activePage = this.state.activePage;
		return <div className="app_element">
			<Navigation active={activePage} />
			<div className="container_wrapper">
				<Home />
			</div>
		</div>;
	}
});