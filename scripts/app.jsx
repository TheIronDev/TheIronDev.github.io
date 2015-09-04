
import React from 'react';

import Navigation from './navigation.jsx';

// Pages
import Home from './pages/home.jsx';
import Portfolio from './pages/portfolio.jsx';
import About from './pages/about.jsx';

export default React.createClass({
	getInitialState() {
		return {
			activePage: 'Home'
		};
	},
	render() {

		let activePage = this.state.activePage,
			Pages = {
				Home: <Home />,
				Portfolio: <Portfolio />,
				About: <About />
			},
			Page = Pages[activePage] || Pages.Home;

		return <div className="app_element">
			<Navigation active={activePage} />
			<div className="container_wrapper">
				{Page}
			</div>
		</div>;
	}
});