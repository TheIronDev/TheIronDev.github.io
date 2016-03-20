
import React from 'react';

let PortfolioItem = ({ portfolioItem }) => {

	let company = (portfolioItem.company || '').toLowerCase(),
		portfolioImage = portfolioItem.image ? portfolioItem.image : '',
		companyClass = company ? 'company-' + company : '',
		itemClassName = `portfolio_item ${companyClass} ${portfolioItem.customClass || ''}`;

	return (<li className={itemClassName}>

		<div className="portfolio_item_more_details" >
			<img className="portfolio_item_background" src={portfolioImage} />
			<div className="portfolio_item_more_details_content">
				<div className="portfolio_item_title">{portfolioItem.name}</div>
				<span className="portfolio_item_description">{portfolioItem.description}</span>
				<a href={portfolioItem.link} className="portfolio_item_link">Link</a>
			</div>
		</div>
	</li>);
};

let PortfolioItems = ( { portfolioItems }) => {

	// Reshape the portfolio, putting portfolioItems into an array based on their year
	let yearObj = portfolioItems.reduce((memo, portfolioItem) => {
		memo[portfolioItem.year] = memo[portfolioItem.year] ? memo[portfolioItem.year].concat(portfolioItem) : [portfolioItem];
		return memo;
	}, {});

	// Convert the years to a set of arrays
	let years = Object.keys(yearObj).sort().reverse();

	// Loop through each year
	let liItems = years.map((year) => {

		// Map each portfolioItem's data into an array of lis
		let portfolioItems = (yearObj[year]).map((portfolioItem) => (<PortfolioItem portfolioItem={portfolioItem} />));

		let portfolioItemsList = (
			<li className="portfolio_items"><ul className="portfolio_items_list">{portfolioItems}</ul></li>
		);

		return [<li className="portfolio_year">{year}</li>].concat(portfolioItemsList);
	});

	return (<ul className='portfolio_itemWrapper'>
		{liItems}
	</ul>)
};

export default class Portfolio extends React.Component {

	render() {
		return <div className="portfolio_wrapper">
			<h2>Portfolio</h2>
			<PortfolioItems portfolioItems={this.props.portfolioItems} />
		</div>;
	}
}