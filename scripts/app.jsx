
import React from 'react';
import Home from './home.jsx';

export default class App extends React.Component {
	render() {
		return <div className="app_element">
			<nav>
				<ul>
					<li>Home</li>
					<li>Portfolio</li>
					<li>Github</li>
				</ul>
			</nav>
			<main className="container">
				<Home />
			</main>
		</div>;
	}
};