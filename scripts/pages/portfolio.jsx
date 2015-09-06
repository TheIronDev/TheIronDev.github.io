
import React from 'react';

export default class Home extends React.Component {

	renderPortfolioItems() {
		return this.props.portfolioItems.map((portfolioItem) => {
			return (<li className="portfolio_item">
				{portfolioItem.name}
			</li>);
		});
	}

	render() {

		let portfolioItems = this.renderPortfolioItems();
		return <div className="portfolio_wrapper">
			<h2>Portfolio</h2>
			<ul className='portfolio_itemWrapper'>
				{portfolioItems}
			</ul>
		</div>;
	}
}