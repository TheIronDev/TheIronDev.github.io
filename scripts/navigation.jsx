
import React from 'react';

export default class Navigation extends React.Component {

	render() {

		let active = this.props.active;
		let sections = ['Home', 'Portfolio', 'About'].map((content) => {

			let className = 'navigation_item ' + content + ' ' + (content === active ? 'active' : '');
			return (<li className={className} key={content}>{content}</li>);
		});

		return <nav className="navigation">
			<ul className="navigation_list">
				{sections}
			</ul>
		</nav>;
	}
};