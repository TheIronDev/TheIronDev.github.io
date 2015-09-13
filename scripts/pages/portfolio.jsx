
import React from 'react';

export default class Home extends React.Component {

	renderPortfolioItemsByYear() {

		let yearObj = this.props.portfolioItems.reduce((memo, portfolioItem) => {
			memo[portfolioItem.year] = memo[portfolioItem.year] ? memo[portfolioItem.year].concat(portfolioItem) : [portfolioItem];
			return memo;
		}, {});

		let years = Object.keys(yearObj).sort().reverse();

		return years.map((year) => {

			let items = (yearObj[year]).map((portfolioItem) => {

				let company = (portfolioItem.company || '').toLowerCase(),
					itemClassName = `portfolio_item ${company ? 'company-' + company : ''}`;

				return (<li className={itemClassName}>
					{portfolioItem.name}
				</li>);
			});

			return [<li className="portfolio_year">{year}</li>].concat(items);
		});


	}

	render() {

		let portfolioItems = this.renderPortfolioItemsByYear();
		return <div className="portfolio_wrapper">
			<h2>Portfolio</h2>
			<ul className='portfolio_itemWrapper'>
				{portfolioItems}
			</ul>
		</div>;
	}
}