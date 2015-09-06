/**
 * This is a Store used in the Flux paradigm.
 *
 * The store's responsibility is:
 *  * Bind data and trigger calls from the AppDispatchers triggered events.
 */

import AppDispatcher from '../AppDispatcher.es6';
import AppConstants from '../AppConstants.es6';

import allPortfolioItems from '../data/portfolio.js';

let Store = {

	activePage: 'Home',
	allPortfolioItems,

	portfolioItems: allPortfolioItems,

	getAppState() {
		return {
			activePage: this.activePage,
			portfolioItems: this.portfolioItems
		}
	},

	// Simple / mini EventEmitter
	eventMap: {},
	on(event, fn) {
		this.eventMap[event] = this.eventMap[event] ? this.eventMap[event].concat(fn) : [fn];
	},
	removeListener(event, fn) {
		this.eventMap[event] = (this.eventMap[event] || []).filter((curr) => curr !== fn);
	},
	trigger(event) {
		(this.eventMap[event] || []).forEach((fn) => fn());
	}
};

AppDispatcher.register( function( action ) {

	switch( action.type) {

		case AppConstants.CHANGE_PAGE:

			// We get to mutate data!
			Store.activePage = action.data;
			Store.trigger('change');
			break;
	}

	return true; // Needed for Flux promise resolution

});

module.exports = Store;