
import React from 'react';

import Navigation from './navigation.jsx';

// Pages
import Home from './pages/home.jsx';
import Portfolio from './pages/portfolio.jsx';
import About from './pages/about.jsx';

// Flux
import AppStore from './stores/AppStore.es6';

export default React.createClass({
	getInitialState() {
		return AppStore.getAppState();
	},
	componentDidMount() {
		AppStore.on('change', this._onChange);
	},
	componentWillUnmount() {
		AppStore.removeListener('change', this._onChange);
	},
	render() {

		let activePage = this.state.activePage,
			Pages = {
				Home: <Home />,
				Portfolio: <Portfolio />,
				About: <About />
			},
			Page = Pages[activePage] || Pages.Home,
			containerClassName = `container ${activePage}`;

		return <div className="app_element">
			<Navigation active={activePage} />
			<div className="container_wrapper">
				<div className={containerClassName}>
					{Page}
				</div>
			</div>
		</div>;
	},
	_onChange(change) {
		this.setState(AppStore.getAppState());
	}
});