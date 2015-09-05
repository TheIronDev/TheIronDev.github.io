
import React from 'react';
import AppActions from './actions/AppActions.es6';

export default class Navigation extends React.Component {

	onClick(page) {
		AppActions.changePage(page);
	}

	render() {

		let active = this.props.active;
		let sections = ['Home', 'Portfolio', 'About'].map((content) => {

			let className = 'navigation_item ' + content + ' ' + (content === active ? 'active' : '');
			return (<li className={className} key={content} onClick={this.onClick.bind(this, content)}>{content}</li>);
		});

		return <nav className="navigation">
			<ul className="navigation_list">
				{sections}
			</ul>
		</nav>;
	}
};