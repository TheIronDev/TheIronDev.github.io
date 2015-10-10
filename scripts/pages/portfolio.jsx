
import React from 'react';

export default class Home extends React.Component {

	renderPortfolioItemsByYear() {

		let yearObj = this.props.portfolioItems.reduce((memo, portfolioItem) => {
			memo[portfolioItem.year] = memo[portfolioItem.year] ? memo[portfolioItem.year].concat(portfolioItem) : [portfolioItem];
			return memo;
		}, {});

		let years = Object.keys(yearObj).sort().reverse();

		return years.map((year) => {

			let items = (yearObj[year]).map((portfolioItem, index) => {

				let company = (portfolioItem.company || '').toLowerCase(),
					portfolioImage = portfolioItem.image ? (<img className="portfolio_item_image" src={portfolioItem.image} />) : '',
					itemPositionClassMap = {
						0: 'left',
						1: 'center',
						2: 'right'
					},
					itemPositionClass = itemPositionClassMap[index%3],
					companyClass = company ? 'company-' + company : '',
					itemClassName = `portfolio_item ${companyClass}`,
					descriptionClassName = `portfolio_item_description ${itemPositionClass}`;

				return (<li className={itemClassName} tabIndex="0">
					<div className="portfolio_item_title">{portfolioItem.name}</div>
					<div className={descriptionClassName}>
						{portfolioImage}
						{portfolioItem.description}
					</div>
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